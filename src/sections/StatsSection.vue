<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watchEffect } from 'vue'
import SiteContainer from '@/components/SiteContainer.vue'
import type { StatItem } from '@/types'

interface Props {
  stats: readonly StatItem[]
}

const props = defineProps<Props>()
const sectionRef = ref<HTMLElement | null>(null)
const displayValues = ref<string[]>([])
const parsedStats = ref<{ target: number; suffix: string }[]>([])
let observer: IntersectionObserver | null = null
let animationFrame: number | null = null
let animationStart: number | null = null
const duration = 1200

watchEffect(() => {
  parsedStats.value = props.stats.map((item) => {
    const match = item.value.match(/\d+/)
    const target = match ? Number(match[0]) : 0
    const suffix = item.value.replace(/\d+/g, '')
    return { target, suffix }
  })

  displayValues.value = parsedStats.value.map(({ suffix }) => `0${suffix}`)
})

const easeOut = (value: number) => 1 - Math.pow(1 - value, 2)

const updateValues = (progress: number) => {
  displayValues.value = parsedStats.value.map(({ target, suffix }) => {
    const current = Math.round(target * easeOut(progress))
    return `${current}${suffix}`
  })
}

const cancelAnimation = () => {
  if (animationFrame !== null) {
    cancelAnimationFrame(animationFrame)
    animationFrame = null
  }
}

const startCountUp = () => {
  if (animationFrame !== null) {
    return
  }

  animationStart = null

  const step = (timestamp: number) => {
    if (animationStart === null) {
      animationStart = timestamp
    }

    const elapsed = timestamp - animationStart
    const progress = Math.min(elapsed / duration, 1)

    updateValues(progress)

    if (progress < 1) {
      animationFrame = requestAnimationFrame(step)
    } else {
      animationFrame = null
    }
  }

  animationFrame = requestAnimationFrame(step)
}

onMounted(() => {
  if (!('IntersectionObserver' in window) || !sectionRef.value) {
    startCountUp()
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        startCountUp()
        observer?.disconnect()
        observer = null
      }
    },
    { threshold: 0.35 },
  )

  observer.observe(sectionRef.value)
})

onBeforeUnmount(() => {
  cancelAnimation()
  observer?.disconnect()
})
</script>

<template>
  <section id="team" ref="sectionRef" class="border-y border-border py-10 sm:py-12" style="scroll-margin-top: 5.5rem;">
    <SiteContainer>
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <article v-for="(item, index) in props.stats" :key="item.id" class="text-left">
          <p class="text-6xl font-light leading-none text-foreground sm:text-7xl">{{ displayValues[index] }}</p>
          <p class="mt-2 text-xl text-muted-foreground sm:text-2xl">{{ item.label }}</p>
        </article>
      </div>
    </SiteContainer>
  </section>
</template>
