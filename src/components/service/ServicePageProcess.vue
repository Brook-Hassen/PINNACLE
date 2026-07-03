<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import SiteContainer from '@/components/SiteContainer.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import type { ServiceProcessStep } from '@/types'

interface Props {
  steps: readonly ServiceProcessStep[]
  cycleKey: number
}

const props = defineProps<Props>()

const timelineRef = ref<HTMLElement | null>(null)
const glowProgress = ref(0)
const stepReached = ref<boolean[]>([])

let rafId = 0

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value))

const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Single scroll trigger — line height and dot glow both derive from this. */
const SCROLL_TRIGGER_RATIO = 0.58

const updateProgress = (): void => {
  const timeline = timelineRef.value
  if (!timeline) return

  const timelineRect = timeline.getBoundingClientRect()
  const timelineHeight = Math.max(timelineRect.height, 1)
  const triggerY = window.innerHeight * SCROLL_TRIGGER_RATIO
  const triggerPercent = clamp(((triggerY - timelineRect.top) / timelineHeight) * 100, 0, 100)

  const items = timeline.querySelectorAll<HTMLElement>('[data-process-step]')
  const nextReached: boolean[] = []

  items.forEach((item, i) => {
    const dot = item.querySelector<HTMLElement>('.service-process-dot')
    if (!dot) {
      nextReached[i] = false
      return
    }

    const dotRect = dot.getBoundingClientRect()
    const dotCenterY = dotRect.top + dotRect.height / 2
    const dotPercent = ((dotCenterY - timelineRect.top) / timelineHeight) * 100
    nextReached[i] = dotPercent <= triggerPercent
  })

  if (prefersReducedMotion()) {
    const inView = timelineRect.top < window.innerHeight && timelineRect.bottom > 0
    stepReached.value = props.steps.map(() => inView)
    glowProgress.value = inView ? 100 : 0
    return
  }

  stepReached.value = nextReached
  glowProgress.value = triggerPercent
}

const onScroll = (): void => {
  cancelAnimationFrame(rafId)
  rafId = requestAnimationFrame(updateProgress)
}

onMounted(() => {
  stepReached.value = props.steps.map(() => false)
  updateProgress()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
})

onUnmounted(() => {
  cancelAnimationFrame(rafId)
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
})

watch(
  () => [props.cycleKey, props.steps.length] as const,
  () => {
    stepReached.value = props.steps.map(() => false)
    nextTick(updateProgress)
  },
)
</script>

<template>
  <section class="section-y relative border-t border-border/40">
    <SiteContainer>
      <SectionHeading
        centered
        tag="Our process"
        title="How we"
        highlight=" deliver."
        description="Five stages, clear checkpoints, and room for feedback before anything is final."
        :cycle-key="cycleKey"
      />

      <ol ref="timelineRef" class="relative mt-16 lg:mt-20">
        <div
          :key="`line-${cycleKey}`"
          class="service-process-line-track pointer-events-none absolute left-[11px] top-0 hidden h-full lg:left-1/2 lg:block lg:-translate-x-1/2"
          aria-hidden="true"
        >
          <div class="service-process-line-glow" :style="{ height: `${glowProgress}%` }">
            <span class="service-process-line-head" />
          </div>
        </div>

        <li
          v-for="(step, i) in steps"
          :key="`${cycleKey}-${step.id}`"
          v-reveal="{ delay: i * 70, cycleKey }"
          data-process-step
          class="relative pb-12 lg:grid lg:grid-cols-2 lg:gap-x-24 lg:pb-16"
        >
          <div
            class="flex w-full items-start gap-4 sm:gap-5 lg:items-center"
            :class="
              i % 2 === 0
                ? 'lg:col-start-2 lg:justify-start lg:pl-10'
                : 'lg:col-start-1 lg:justify-end lg:pr-10'
            "
          >
            <span
              class="service-process-dot mt-8 size-6 shrink-0 rounded-full border-2 bg-background lg:mt-0"
              :class="{ 'service-process-dot--active': stepReached[i] }"
              aria-hidden="true"
            />
            <div
              class="service-process-card min-w-0 flex-1 rounded-[var(--radius-card-lg)] border border-border/50 bg-card/30 p-6 backdrop-blur transition-colors duration-300 hover:border-[rgba(43,191,184,0.35)] sm:p-8"
            >
              <p class="font-mono text-sm text-[var(--accent-soft-hex)]">{{ step.step }}</p>
              <h3 class="mt-2 text-xl font-semibold text-foreground sm:text-2xl">{{ step.title }}</h3>
              <p class="mt-3 text-base leading-relaxed text-muted-foreground">{{ step.description }}</p>
            </div>
          </div>
        </li>
      </ol>
    </SiteContainer>
  </section>
</template>

<style scoped>
.service-process-dot {
  border-color: rgba(236, 242, 239, 0.18);
  box-shadow: none;
  filter: none;
  transition:
    border-color 0.15s ease,
    background 0.15s ease,
    box-shadow 0.15s ease;
}

.service-process-dot--active {
  border-color: var(--accent-glow-hex);
  background: rgba(43, 191, 184, 0.12);
  box-shadow:
    0 0 8px var(--accent-glow-hex),
    0 0 20px rgba(43, 191, 184, 0.45);
}

.service-process-line-track {
  width: 1px;
  background: rgba(236, 242, 239, 0.1);
}

.service-process-line-glow {
  position: relative;
  width: 2px;
  margin-left: -0.5px;
  background: linear-gradient(
    to bottom,
    rgba(43, 191, 184, 0.35),
    var(--accent-soft-hex) 70%,
    var(--accent-glow-hex)
  );
  box-shadow:
    0 0 6px var(--accent-glow-hex),
    0 0 18px rgba(43, 191, 184, 0.45),
    0 0 36px rgba(43, 191, 184, 0.18);
  will-change: height;
}

.service-process-line-head {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 8px;
  height: 8px;
  border-radius: 9999px;
  background: var(--accent-glow-hex);
  box-shadow:
    0 0 8px var(--accent-glow-hex),
    0 0 20px rgba(43, 191, 184, 0.55);
  transform: translate(-50%, 50%);
}

@media (prefers-reduced-motion: no-preference) {
  .service-process-dot {
    animation: service-process-dot-pop 0.45s var(--ease-out-premium) both;
    animation-delay: calc(var(--reveal-delay, 0ms) + 120ms);
  }
}

@keyframes service-process-dot-pop {
  from {
    opacity: 0;
    transform: scale(0.4);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .service-process-dot {
    animation: none;
  }
}
</style>
