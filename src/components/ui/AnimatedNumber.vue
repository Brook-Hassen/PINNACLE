<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

interface Props {
  value: string
  duration?: number
}

const props = withDefaults(defineProps<Props>(), {
  duration: 1800,
})

const parsed = computed(() => {
  const m = props.value.trim().match(/^([+-]?)([\d,]+(?:\.\d+)?)(.*)$/)
  if (!m || !m[2]) {
    return {
      decimals: 0,
      num: 0,
      prefix: '',
      suffix: props.value,
    }
  }

  const raw = m[2].replace(/,/g, '')
  const decimals = raw.includes('.') ? (raw.split('.')[1]?.length ?? 0) : 0
  return {
    decimals,
    num: Number(raw),
    prefix: m[1] ?? '',
    suffix: (m[3] ?? '').trimStart(),
  }
})

const count = ref(0)
const elRef = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null
let frame: number | null = null
let started = false

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

const start = () => {
  if (started) return
  started = true
  const startTs = performance.now()
  const tick = (now: number) => {
    const t = Math.min((now - startTs) / props.duration, 1)
    count.value = easeOutCubic(t) * parsed.value.num
    if (t < 1) {
      frame = requestAnimationFrame(tick)
    } else {
      count.value = parsed.value.num
      frame = null
    }
  }
  frame = requestAnimationFrame(tick)
}

onMounted(() => {
  const el = elRef.value
  if (!el) return
  if (!('IntersectionObserver' in window)) {
    start()
    return
  }
  observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        start()
        observer?.disconnect()
        observer = null
      }
    },
    { threshold: 0.4 },
  )
  observer.observe(el)
})

onBeforeUnmount(() => {
  if (frame !== null) cancelAnimationFrame(frame)
  observer?.disconnect()
})
</script>

<template>
  <span ref="elRef">
    {{ parsed.prefix }}{{ count.toLocaleString(undefined, {
      maximumFractionDigits: parsed.decimals,
      minimumFractionDigits: parsed.decimals,
    }) }}{{ parsed.suffix }}
  </span>
</template>
