<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import * as THREE from 'three'

interface Cubie {
  grp: THREE.Group
  mesh: THREE.Mesh
  lx: number
  ly: number
  lz: number
}

const wrapperRef = ref<HTMLDivElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)
const hintHidden = ref<boolean>(false)

let renderer: THREE.WebGLRenderer | null = null
let scene: THREE.Scene | null = null
let camera: THREE.PerspectiveCamera | null = null
let cubeGrp: THREE.Group | null = null
let pivot: THREE.Group | null = null
let shadowMat: THREE.ShadowMaterial | null = null
let clock: THREE.Clock | null = null
let animationFrameId = 0

const cubies: Cubie[] = []
let sharedBodyGeometry: THREE.BoxGeometry | null = null
let sharedEdgeGeometry: THREE.EdgesGeometry | null = null
let sharedBodyMaterial: THREE.MeshStandardMaterial | null = null
let sharedEdgeMaterial: THREE.LineBasicMaterial | null = null

const raycaster = new THREE.Raycaster()
const ndc = new THREE.Vector2()

const STEP = 1.07
const MOVE_SPEED = 7.5

let animating = false
let animCubies: Cubie[] = []
let animAxis: 'x' | 'y' | 'z' = 'y'
let animTarget = 0
let animCurrent = 0

let mode: 'orbit' | 'pending' | 'move' | null = null
let prevPos = { x: 0, y: 0 }
let downPos = { x: 0, y: 0 }
let angularVelocity = { x: 0, y: 0 }
let hitCubie: Cubie | null = null
const hitNormal = new THREE.Vector3()
const velocityHistory: Array<{ vx: number; vy: number }> = []

const FRICTION = 0.88
const AUTO_SPIN = 0.0012
const MIN_SPIN_VELOCITY = 0.001

const onResize = (): void => {
  if (!wrapperRef.value || !renderer || !camera) return
  const width = wrapperRef.value.clientWidth
  const height = wrapperRef.value.clientHeight
  if (width <= 0 || height <= 0) return

  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height, false)
}

const snapAxis = (vector: THREE.Vector3): THREE.Vector3 => {
  const ax = Math.abs(vector.x)
  const ay = Math.abs(vector.y)
  const az = Math.abs(vector.z)
  const max = Math.max(ax, ay, az)

  return new THREE.Vector3(
    ax === max ? Math.sign(vector.x) : 0,
    ay === max ? Math.sign(vector.y) : 0,
    az === max ? Math.sign(vector.z) : 0,
  )
}

const startMove = (cubie: Cubie, faceNormalLocal: THREE.Vector3, dx: number, dy: number): void => {
  if (!camera || !cubeGrp || !pivot || animating) return
  const cube = cubeGrp
  const movePivot = pivot

  const camRight = new THREE.Vector3().setFromMatrixColumn(camera.matrixWorld, 0)
  const camUp = new THREE.Vector3().setFromMatrixColumn(camera.matrixWorld, 1)

  const dragWorld = camRight.clone().multiplyScalar(dx).addScaledVector(camUp, -dy).normalize()
  const dragLocal = dragWorld.applyQuaternion(cube.quaternion.clone().invert()).normalize()
  const rotRaw = faceNormalLocal.clone().cross(dragLocal)
  const rotAxis = snapAxis(rotRaw)

  if (!rotAxis.length()) return

  const axis: 'x' | 'y' | 'z' = rotAxis.x ? 'x' : rotAxis.y ? 'y' : 'z'
  const direction = rotAxis[axis]
  const layer = Math.round(cubie[`l${axis}` as 'lx' | 'ly' | 'lz'])

  animCubies = cubies.filter((item) => Math.round(item[`l${axis}` as 'lx' | 'ly' | 'lz']) === layer)
  if (!animCubies.length) return

  movePivot.rotation.set(0, 0, 0)
  animCubies.forEach((item) => {
    const p = item.grp.position.clone()
    const q = item.grp.quaternion.clone()
    cube.remove(item.grp)
    movePivot.add(item.grp)
    item.grp.position.copy(p)
    item.grp.quaternion.copy(q)
  })

  animAxis = axis
  animTarget = (Math.PI / 2) * direction
  animCurrent = 0
  animating = true
}

const finishMove = (): void => {
  if (!pivot || !cubeGrp) return
  const movePivot = pivot
  const cube = cubeGrp

  movePivot.rotation[animAxis] = animTarget
  const pq = new THREE.Quaternion().setFromEuler(movePivot.rotation)

  animCubies.forEach((item) => {
    const newPos = item.grp.position.clone().applyQuaternion(pq)
    const newQuat = pq.clone().multiply(item.grp.quaternion)

    movePivot.remove(item.grp)
    cube.add(item.grp)

    item.lx = Math.round(newPos.x / STEP)
    item.ly = Math.round(newPos.y / STEP)
    item.lz = Math.round(newPos.z / STEP)

    item.grp.position.set(item.lx * STEP, item.ly * STEP, item.lz * STEP)
    item.grp.quaternion.copy(newQuat)
  })

  animating = false
}

const getPointerPosition = (event: PointerEvent): { x: number; y: number } => {
  return { x: event.clientX, y: event.clientY }
}

const pickCubie = (clientX: number, clientY: number): { cubie: Cubie; normalLocal: THREE.Vector3 } | null => {
  if (!canvasRef.value || !camera || !cubeGrp) return null

  const rect = canvasRef.value.getBoundingClientRect()
  ndc.set(((clientX - rect.left) / rect.width) * 2 - 1, -((clientY - rect.top) / rect.height) * 2 + 1)
  raycaster.setFromCamera(ndc, camera)

  const meshes = cubies.map((item) => item.mesh)
  const intersections = raycaster.intersectObjects(meshes, false)
  if (!intersections.length) return null

  const first = intersections[0]
  if (!first || !first.face) return null

  const found = cubies.find((item) => item.mesh === first.object)
  if (!found) return null

  const normalWorld = first.face.normal
    .clone()
    .applyNormalMatrix(new THREE.Matrix3().getNormalMatrix(first.object.matrixWorld))
    .normalize()

  const normalLocal = normalWorld.applyQuaternion(cubeGrp.quaternion.clone().invert()).normalize()
  return { cubie: found, normalLocal }
}

const onPointerDown = (event: PointerEvent): void => {
  if (!canvasRef.value || animating) return

  canvasRef.value.setPointerCapture(event.pointerId)
  const position = getPointerPosition(event)
  downPos = position
  prevPos = position
  angularVelocity = { x: 0, y: 0 }
  velocityHistory.length = 0

  const picked = pickCubie(position.x, position.y)
  if (picked) {
    hitCubie = picked.cubie
    hitNormal.copy(picked.normalLocal)
    mode = 'pending'
  } else {
    mode = 'orbit'
  }
}

const onPointerMove = (event: PointerEvent): void => {
  if (!cubeGrp || !mode) return

  const position = getPointerPosition(event)
  const dx = position.x - prevPos.x
  const dy = position.y - prevPos.y

  if (mode === 'orbit') {
    const sensitivity = 0.011
    const vx = dy * sensitivity
    const vy = dx * sensitivity
    cubeGrp.rotation.x += vx
    cubeGrp.rotation.y += vy
    velocityHistory.push({ vx, vy })
    if (velocityHistory.length > 4) velocityHistory.shift()
  } else if (mode === 'pending' && hitCubie) {
    const totalDx = position.x - downPos.x
    const totalDy = position.y - downPos.y
    if (Math.hypot(totalDx, totalDy) > 13) {
      mode = 'move'
      startMove(hitCubie, hitNormal, totalDx, totalDy)
    }
  }

  prevPos = position
}

const onPointerUp = (): void => {
  if (mode === 'orbit' && velocityHistory.length) {
    const aggregated = velocityHistory.reduce(
      (acc, item) => ({ vx: acc.vx + item.vx, vy: acc.vy + item.vy }),
      { vx: 0, vy: 0 },
    )
    angularVelocity = {
      x: aggregated.vx / velocityHistory.length,
      y: aggregated.vy / velocityHistory.length,
    }
  }

  mode = null
  hitCubie = null
  velocityHistory.length = 0
}

const animate = (): void => {
  if (!renderer || !scene || !camera || !cubeGrp || !clock) return

  animationFrameId = requestAnimationFrame(animate)
  const dt = Math.min(clock.getDelta(), 0.05)
  const elapsed = clock.elapsedTime

  cubeGrp.position.y = Math.sin(elapsed * 0.85) * 0.22
  if (shadowMat) {
    shadowMat.opacity = 0.38 + 0.16 * (1 - (Math.sin(elapsed * 0.85) + 1) / 2)
  }

  if (animating && pivot) {
    const remaining = animTarget - animCurrent
    const step = Math.sign(remaining) * Math.min(Math.abs(remaining), MOVE_SPEED * dt)
    animCurrent += step
    pivot.rotation[animAxis] = animCurrent

    if (Math.abs(remaining) <= MOVE_SPEED * dt + 1e-5) {
      finishMove()
    }
  }

  if (mode !== 'orbit') {
    angularVelocity.x *= FRICTION
    angularVelocity.y *= FRICTION

    const speed = Math.hypot(angularVelocity.x, angularVelocity.y)
    if (speed < MIN_SPIN_VELOCITY) {
      angularVelocity.y += AUTO_SPIN * (1 - speed / MIN_SPIN_VELOCITY)
    }

    cubeGrp.rotation.x += angularVelocity.x
    cubeGrp.rotation.y += angularVelocity.y
  }

  renderer.render(scene, camera)
}

const init = (): void => {
  if (!canvasRef.value || !wrapperRef.value) return

  renderer = new THREE.WebGLRenderer({ canvas: canvasRef.value, antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.setClearColor(0x000000, 1)

  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100)
  camera.position.set(5.0, 3.9, 6.6)
  camera.lookAt(0, 0, 0)

  scene.add(new THREE.AmbientLight(0xffffff, 0.04))

  const key = new THREE.DirectionalLight(0xffffff, 3.2)
  key.position.set(8, 14, 9)
  key.castShadow = true
  key.shadow.mapSize.set(1024, 1024)
  key.shadow.camera.near = 1
  key.shadow.camera.far = 50
  key.shadow.camera.left = -10
  key.shadow.camera.right = 10
  key.shadow.camera.top = 10
  key.shadow.camera.bottom = -10
  key.shadow.bias = -0.001
  scene.add(key)

  const rim = new THREE.DirectionalLight(0x6699ff, 1.4)
  rim.position.set(-8, 4, -9)
  scene.add(rim)

  const bounce = new THREE.DirectionalLight(0xffeedd, 0.5)
  bounce.position.set(2, -8, 5)
  scene.add(bounce)

  const point = new THREE.PointLight(0xffffff, 2.0, 14)
  point.position.set(3, 5, 4)
  scene.add(point)

  shadowMat = new THREE.ShadowMaterial({ opacity: 0.6 })
  const shadowPlane = new THREE.Mesh(new THREE.PlaneGeometry(22, 22), shadowMat)
  shadowPlane.rotation.x = -Math.PI / 2
  shadowPlane.position.y = -2.8
  shadowPlane.receiveShadow = true
  scene.add(shadowPlane)

  cubeGrp = new THREE.Group()
  cubeGrp.rotation.x = 0.4
  cubeGrp.rotation.y = 0.72
  scene.add(cubeGrp)

  pivot = new THREE.Group()
  cubeGrp.add(pivot)

  sharedBodyGeometry = new THREE.BoxGeometry(0.94, 0.94, 0.94)
  sharedEdgeGeometry = new THREE.EdgesGeometry(new THREE.BoxGeometry(0.96, 0.96, 0.96))
  sharedBodyMaterial = new THREE.MeshStandardMaterial({
    color: 0x080808,
    roughness: 0.18,
    metalness: 0.92,
  })
  sharedEdgeMaterial = new THREE.LineBasicMaterial({
    color: 0xbbbbbb,
    transparent: true,
    opacity: 0.5,
  })

  cubies.length = 0
  for (let lx = -1; lx <= 1; lx += 1) {
    for (let ly = -1; ly <= 1; ly += 1) {
      for (let lz = -1; lz <= 1; lz += 1) {
        const grp = new THREE.Group()
        const mesh = new THREE.Mesh(sharedBodyGeometry, sharedBodyMaterial)
        mesh.castShadow = true
        mesh.receiveShadow = true
        grp.add(mesh)

        const edgeLine = new THREE.LineSegments(sharedEdgeGeometry, sharedEdgeMaterial)
        grp.add(edgeLine)

        grp.position.set(lx * STEP, ly * STEP, lz * STEP)
        cubeGrp.add(grp)
        cubies.push({ grp, mesh, lx, ly, lz })
      }
    }
  }

  clock = new THREE.Clock()
  hintHidden.value = false
  onResize()
  animate()

  canvasRef.value.addEventListener('pointerdown', onPointerDown)
  window.addEventListener('pointermove', onPointerMove, { passive: true })
  window.addEventListener('pointerup', onPointerUp, { passive: true })
  window.addEventListener('resize', onResize, { passive: true })
}

const dispose = (): void => {
  cancelAnimationFrame(animationFrameId)

  if (canvasRef.value) {
    canvasRef.value.removeEventListener('pointerdown', onPointerDown)
  }
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('pointerup', onPointerUp)
  window.removeEventListener('resize', onResize)

  cubies.splice(0, cubies.length)
  sharedBodyGeometry?.dispose()
  sharedEdgeGeometry?.dispose()
  sharedBodyMaterial?.dispose()
  sharedEdgeMaterial?.dispose()
  renderer?.dispose()

  renderer = null
  scene = null
  camera = null
  cubeGrp = null
  pivot = null
  shadowMat = null
  sharedBodyGeometry = null
  sharedEdgeGeometry = null
  sharedBodyMaterial = null
  sharedEdgeMaterial = null
  clock = null
}

onMounted(init)
onBeforeUnmount(dispose)
</script>

<template>
  <div ref="wrapperRef" class="cube-wrap">
    <canvas
      ref="canvasRef"
      class="cube-canvas"
      @pointerdown="hintHidden = true"
    />
    <p class="cube-hint" :class="{ gone: hintHidden }">Drag background · orbit | Drag face · turn layer</p>
  </div>
</template>

<style scoped>
.cube-wrap {
  position: relative;
  width: 100%;
  height: 100%;
}

.cube-canvas {
  display: block;
  width: 100%;
  height: 100%;
  cursor: grab;
}

.cube-canvas:active {
  cursor: grabbing;
}

.cube-hint {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, 0.18);
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  pointer-events: none;
  transition: opacity 2s ease;
}

.cube-hint.gone {
  opacity: 0;
}
</style>
