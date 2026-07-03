<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  radius?: number
  tint?: string
}

const props = withDefaults(defineProps<Props>(), {
  radius: 320,
  tint: 'rgba(43, 191, 184, 0.12)',
})

const cardRef = ref<HTMLElement | null>(null)
const x = ref(0)
const y = ref(0)
const visible = ref(false)

const onMove = (e: MouseEvent) => {
  const el = cardRef.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  x.value = e.clientX - rect.left
  y.value = e.clientY - rect.top
}
</script>

<template>
  <div
    ref="cardRef"
    class="spot-card group relative"
    @mousemove="onMove"
    @mouseenter="visible = true"
    @mouseleave="visible = false"
  >
    <div
      class="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500"
      :style="{
        opacity: visible ? 1 : 0,
        background: `radial-gradient(${props.radius}px circle at ${x}px ${y}px, ${props.tint} 0%, transparent 70%)`,
      }"
    />
    <div class="relative z-10 flex h-full flex-col">
      <slot />
    </div>
  </div>
</template>
