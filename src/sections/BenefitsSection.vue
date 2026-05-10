<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, type Component } from 'vue'
import { Blocks, BriefcaseBusiness, Rocket, Sparkles, Users, Workflow } from 'lucide-vue-next'
import SiteContainer from '@/components/SiteContainer.vue'
import type { BenefitItem } from '@/types'

interface Props {
  benefits: readonly BenefitItem[]
}

const props = defineProps<Props>()

const benefitIconMap: Record<BenefitItem['id'], Component> = {
  'rapid-market-entry': Rocket,
  'direct-expert-access': Users,
  'integrated-ecosystems': Workflow,
  'management-led-strategy': BriefcaseBusiness,
  'architectural-precision': Blocks,
}

const benefitsWithIcons = computed(() =>
  props.benefits.map((benefit) => ({
    ...benefit,
    icon: benefitIconMap[benefit.id] ?? Sparkles,
  })),
)

const viewportRef = ref<HTMLElement | null>(null)
const trackRef = ref<HTMLElement | null>(null)
const currentOffset = ref(0)
const targetOffset = ref(0)
const maxOffset = ref(0)
const isInteractive = ref(false)

let frameId: number | null = null
let resizeObserver: ResizeObserver | null = null
let motionQuery: MediaQueryList | null = null

const applyOffset = () => {
  viewportRef.value?.style.setProperty('--work-offset', `${currentOffset.value}px`)
}

const stopAnimation = () => {
  if (frameId !== null) {
    cancelAnimationFrame(frameId)
    frameId = null
  }
}

const animateOffset = () => {
  const delta = targetOffset.value - currentOffset.value

  if (Math.abs(delta) < 0.35) {
    currentOffset.value = targetOffset.value
    applyOffset()
    frameId = null
    return
  }

  currentOffset.value += delta * 0.12
  applyOffset()
  frameId = requestAnimationFrame(animateOffset)
}

const queueAnimation = () => {
  if (frameId === null) {
    frameId = requestAnimationFrame(animateOffset)
  }
}

const syncInteractivity = () => {
  const prefersReducedMotion = motionQuery?.matches ?? false

  isInteractive.value = !prefersReducedMotion && window.innerWidth >= 1024 && maxOffset.value > 0

  if (!isInteractive.value) {
    stopAnimation()
    currentOffset.value = 0
    targetOffset.value = 0
    applyOffset()
  }
}

const measureTrack = () => {
  const viewport = viewportRef.value
  const track = trackRef.value

  if (!viewport || !track) return

  maxOffset.value = Math.max(track.scrollWidth - viewport.clientWidth, 0)
  currentOffset.value = Math.min(currentOffset.value, maxOffset.value)
  targetOffset.value = Math.min(targetOffset.value, maxOffset.value)
  applyOffset()
  syncInteractivity()
}

const handleRevealMove = (event: MouseEvent) => {
  const viewport = viewportRef.value

  if (!viewport || !isInteractive.value || maxOffset.value <= 0) return

  const bounds = viewport.getBoundingClientRect()
  const pointerProgress = (event.clientX - bounds.left) / bounds.width
  const clampedProgress = Math.min(Math.max(pointerProgress, 0), 1)
  const revealProgress = Math.pow(clampedProgress, 0.9)

  targetOffset.value = maxOffset.value * revealProgress
  queueAnimation()
}

const primeReveal = () => {
  if (!isInteractive.value || maxOffset.value <= 0) return

  targetOffset.value = Math.max(targetOffset.value, maxOffset.value * 0.08)
  queueAnimation()
}

const resetReveal = () => {
  if (!isInteractive.value) return

  targetOffset.value = 0
  queueAnimation()
}

const handleEnvironmentChange = () => {
  measureTrack()
}

onMounted(() => {
  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

  resizeObserver = new ResizeObserver(() => {
    measureTrack()
  })

  if (viewportRef.value) resizeObserver.observe(viewportRef.value)
  if (trackRef.value) resizeObserver.observe(trackRef.value)

  window.addEventListener('resize', handleEnvironmentChange)
  motionQuery.addEventListener('change', handleEnvironmentChange)

  measureTrack()
})

onBeforeUnmount(() => {
  stopAnimation()
  resizeObserver?.disconnect()
  window.removeEventListener('resize', handleEnvironmentChange)
  motionQuery?.removeEventListener('change', handleEnvironmentChange)
})
</script>

<template>
  <section id="work" class="py-12 sm:py-16">
    <SiteContainer>
      <p class="max-w-4xl text-3xl font-medium leading-tight text-foreground sm:text-5xl">
        Frustrated with finding the perfect digital designer hire?
      </p>
      <p class="mt-3 max-w-4xl text-lg leading-snug text-muted-foreground sm:text-2xl">
        PINNACLE AI offers fast, reliable and superior design by senior creatives on tap immediately.
      </p>

      <div
        ref="viewportRef"
        class="work-viewport mt-8 pb-2"
        :class="{ 'work-viewport--interactive': isInteractive }"
        @mouseenter="primeReveal"
        @mousemove="handleRevealMove"
        @mouseleave="resetReveal"
      >
        <div ref="trackRef" class="work-track">
          <article
            v-for="benefit in benefitsWithIcons"
            :key="benefit.id"
            class="work-card group rounded-3xl border border-border/80 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-foreground/20 hover:bg-card/90 sm:p-7"
          >
            <div
              class="flex h-14 w-14 items-center justify-center rounded-full border border-border/80 bg-background/70 text-foreground transition-colors duration-300 group-hover:border-foreground/30 group-hover:text-white"
            >
              <component :is="benefit.icon" class="h-5 w-5" aria-hidden="true" />
            </div>
            <h3
              class="mt-6 min-h-[4.1rem] max-w-[15ch] text-2xl font-semibold leading-[1.08] text-card-foreground lg:text-[2rem]"
            >
              {{ benefit.title }}
            </h3>
            <p class="mt-3 max-w-[25ch] text-sm leading-relaxed text-muted-foreground lg:text-base">
              {{ benefit.description }}
            </p>
          </article>
        </div>
      </div>
    </SiteContainer>
  </section>
</template>

<style scoped>
.work-viewport {
  --work-offset: 0px;
  overflow-x: auto;
  overflow-y: visible;
  padding-inline: 0.125rem;
  scrollbar-width: none;
  touch-action: pan-x;
}

.work-viewport::-webkit-scrollbar {
  display: none;
}

.work-track {
  display: flex;
  width: max-content;
  align-items: stretch;
  gap: 1rem;
  padding-right: 1rem;
}

.work-card {
  flex: 0 0 min(78vw, 18rem);
  display: flex;
  flex-direction: column;
  min-height: 14.75rem;
  box-shadow: 0 24px 44px -34px rgba(0, 0, 0, 0.9);
}

@media (min-width: 768px) {
  .work-track {
    gap: 1.25rem;
    padding-right: 1.25rem;
  }

  .work-card {
    flex-basis: min(44vw, 19.5rem);
  }
}

@media (min-width: 1024px) {
  .work-viewport--interactive {
    overflow: hidden;
    cursor: ew-resize;
  }

  .work-track {
    gap: 1.5rem;
    padding-right: 1.5rem;
    transform: translate3d(calc(var(--work-offset) * -1), 0, 0);
    will-change: transform;
  }

  .work-card {
    flex-basis: clamp(19rem, 21vw, 20.5rem);
    min-height: 15rem;
  }
}
</style>
