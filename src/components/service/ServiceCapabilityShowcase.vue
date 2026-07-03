<script setup lang="ts">
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { ComponentPublicInstance } from 'vue'
import type { ServiceOfferingGroup } from '@/types'

interface Props {
  offerings: readonly ServiceOfferingGroup[]
  cycleKey: number
}

const props = defineProps<Props>()

const viewportRef = ref<HTMLElement | null>(null)
const cardRefs = ref<(HTMLElement | null)[]>([])
const activeIndex = ref(0)
const scrollOffset = ref(0)
const isReducedMotion = ref(false)

let scrollRaf = 0
let resizeObserver: ResizeObserver | null = null

const setCardRef = (el: Element | ComponentPublicInstance | null, index: number) => {
  cardRefs.value[index] = el instanceof HTMLElement ? el : null
}

const updateActiveIndex = () => {
  const viewport = viewportRef.value
  if (!viewport) return

  const center = viewport.scrollLeft + viewport.clientWidth / 2
  let closest = 0
  let minDistance = Number.POSITIVE_INFINITY

  cardRefs.value.forEach((card, index) => {
    if (!card) return
    const cardCenter = card.offsetLeft + card.offsetWidth / 2
    const distance = Math.abs(center - cardCenter)
    if (distance < minDistance) {
      minDistance = distance
      closest = index
    }
  })

  activeIndex.value = closest
}

const onScroll = () => {
  scrollOffset.value = viewportRef.value?.scrollLeft ?? 0
  cancelAnimationFrame(scrollRaf)
  scrollRaf = requestAnimationFrame(updateActiveIndex)
}

const scrollToIndex = (index: number, behavior: ScrollBehavior = 'smooth') => {
  const viewport = viewportRef.value
  const card = cardRefs.value[index]
  if (!viewport || !card) return

  const target =
    card.offsetLeft - (viewport.clientWidth - card.offsetWidth) / 2

  viewport.scrollTo({
    left: Math.max(0, target),
    behavior: isReducedMotion.value ? 'auto' : behavior,
  })
  activeIndex.value = index
}

const goPrevious = () => {
  const next = (activeIndex.value - 1 + props.offerings.length) % props.offerings.length
  scrollToIndex(next)
}

const goNext = () => {
  const next = (activeIndex.value + 1) % props.offerings.length
  scrollToIndex(next)
}

const onKeydown = (event: KeyboardEvent) => {
  if (event.key === 'ArrowLeft') {
    event.preventDefault()
    goPrevious()
  }
  if (event.key === 'ArrowRight') {
    event.preventDefault()
    goNext()
  }
}

const glowStyle = computed(() => {
  void scrollOffset.value

  const card = cardRefs.value[activeIndex.value]
  const viewport = viewportRef.value
  if (!card || !viewport) return { opacity: '0' }

  const cardCenter = card.offsetLeft + card.offsetWidth / 2
  const left = cardCenter - viewport.scrollLeft

  return {
    opacity: '1',
    transform: `translateX(${left}px) translateX(-50%)`,
    width: `${Math.min(card.offsetWidth * 1.15, 720)}px`,
  }
})

const resetShowcase = async () => {
  activeIndex.value = 0
  cardRefs.value = []
  await nextTick()
  const viewport = viewportRef.value
  if (viewport) viewport.scrollLeft = 0
  await nextTick()
  updateActiveIndex()
}

watch(
  () => props.cycleKey,
  () => {
    void resetShowcase()
  },
)

onMounted(() => {
  isReducedMotion.value =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const viewport = viewportRef.value
  if (viewport && 'ResizeObserver' in window) {
    resizeObserver = new ResizeObserver(() => updateActiveIndex())
    resizeObserver.observe(viewport)
  }

  void resetShowcase()
})

onBeforeUnmount(() => {
  cancelAnimationFrame(scrollRaf)
  resizeObserver?.disconnect()
})
</script>

<template>
  <div
    class="capability-showcase"
    role="region"
    aria-roledescription="carousel"
    :aria-label="`Service capabilities, ${offerings.length} groups`"
    tabindex="0"
    @keydown="onKeydown"
  >
    <div class="capability-showcase__stage">
      <div
        class="capability-showcase__glow pointer-events-none"
        :style="glowStyle"
        aria-hidden="true"
      />

      <button
        type="button"
        class="capability-showcase__nav capability-showcase__nav--prev"
        aria-label="Previous capability"
        @click="goPrevious"
      >
        <ChevronLeft class="size-5" />
      </button>

      <div
        ref="viewportRef"
        class="capability-showcase__viewport"
        @scroll.passive="onScroll"
      >
        <div class="capability-showcase__track">
          <article
            v-for="(group, index) in offerings"
            :key="`${cycleKey}-${group.id}`"
            :ref="(el) => setCardRef(el, index)"
            class="capability-showcase__card"
            :class="{
              'is-active': activeIndex === index,
              'is-adjacent': Math.abs(activeIndex - index) === 1,
            }"
            :aria-current="activeIndex === index ? 'true' : undefined"
            @click="scrollToIndex(index)"
          >
            <div class="capability-showcase__card-inner">
              <p class="capability-showcase__index">
                {{ String(index + 1).padStart(2, '0') }}
              </p>
              <h3 class="capability-showcase__title">{{ group.title }}</h3>
              <div class="capability-showcase__accent" aria-hidden="true" />

              <ul
                :key="`${cycleKey}-${activeIndex}-${group.id}`"
                class="capability-showcase__list"
              >
                <li
                  v-for="(item, bulletIndex) in group.items"
                  :key="item"
                  class="capability-showcase__bullet"
                  :class="{ 'is-visible': activeIndex === index }"
                  :style="
                    activeIndex === index
                      ? { animationDelay: `${bulletIndex * 65}ms` }
                      : undefined
                  "
                >
                  <span class="capability-showcase__bullet-dot" aria-hidden="true" />
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>
          </article>
        </div>
      </div>

      <button
        type="button"
        class="capability-showcase__nav capability-showcase__nav--next"
        aria-label="Next capability"
        @click="goNext"
      >
        <ChevronRight class="size-5" />
      </button>
    </div>

    <div class="capability-showcase__footer">
      <div class="capability-showcase__dots" role="tablist" :aria-label="`Capability groups`">
        <button
          v-for="(group, index) in offerings"
          :key="`dot-${cycleKey}-${group.id}`"
          type="button"
          role="tab"
          class="capability-showcase__dot"
          :class="{ 'is-active': activeIndex === index }"
          :aria-selected="activeIndex === index"
          :aria-label="`Go to ${group.title}`"
          @click="scrollToIndex(index)"
        />
      </div>
      <p class="capability-showcase__counter" aria-live="polite">
        <span class="text-[var(--accent-soft-hex)]">{{ String(activeIndex + 1).padStart(2, '0') }}</span>
        <span class="text-muted-foreground"> / {{ String(offerings.length).padStart(2, '0') }}</span>
      </p>
    </div>
  </div>
</template>

<style scoped>
.capability-showcase {
  margin-top: 4rem;
  outline: none;
}

.capability-showcase:focus-visible {
  outline: 2px solid var(--accent-glow-hex);
  outline-offset: 6px;
  border-radius: 1rem;
}

.capability-showcase__stage {
  position: relative;
}

.capability-showcase__glow {
  position: absolute;
  top: 50%;
  left: 0;
  z-index: 0;
  height: min(420px, 72vw);
  border-radius: 9999px;
  background: radial-gradient(
    ellipse at center,
    rgba(43, 191, 184, 0.22) 0%,
    rgba(17, 100, 102, 0.1) 38%,
    transparent 72%
  );
  filter: blur(28px);
  opacity: 0;
  transition:
    transform 0.55s var(--ease-out-premium),
    width 0.55s var(--ease-out-premium),
    opacity 0.4s ease;
  will-change: transform, width;
}

.capability-showcase__viewport {
  position: relative;
  z-index: 1;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  padding-block: 1.5rem;
  mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 8%,
    black 92%,
    transparent 100%
  );
}

.capability-showcase__viewport::-webkit-scrollbar {
  display: none;
}

.capability-showcase__track {
  display: flex;
  align-items: stretch;
  gap: 1.25rem;
  padding-inline: max(1.25rem, calc((100% - min(88vw, 680px)) / 2));
}

.capability-showcase__card {
  flex: 0 0 min(88vw, 680px);
  scroll-snap-align: center;
  cursor: pointer;
  transform: scale(0.9);
  opacity: 0.45;
  filter: blur(0.4px);
  transition:
    transform 0.55s var(--ease-out-premium),
    opacity 0.55s var(--ease-out-premium),
    filter 0.55s var(--ease-out-premium);
}

.capability-showcase__card.is-adjacent {
  transform: scale(0.94);
  opacity: 0.68;
  filter: blur(0);
}

.capability-showcase__card.is-active {
  transform: scale(1);
  opacity: 1;
  filter: blur(0);
  cursor: default;
}

.capability-showcase__card-inner {
  position: relative;
  height: 100%;
  overflow: hidden;
  border-radius: 1.5rem;
  border: 1px solid var(--border-soft);
  background: linear-gradient(165deg, rgba(19, 27, 26, 0.92) 0%, rgba(4, 8, 10, 0.98) 100%);
  padding: 2rem 1.75rem;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.45);
  transition:
    border-color 0.45s ease,
    box-shadow 0.55s var(--ease-out-premium);
}

@media (min-width: 640px) {
  .capability-showcase__card-inner {
    padding: 2.5rem 2.25rem;
  }
}

.capability-showcase__card.is-active .capability-showcase__card-inner {
  border-color: rgba(43, 191, 184, 0.42);
  box-shadow:
    0 0 0 1px rgba(43, 191, 184, 0.12),
    0 28px 90px rgba(0, 0, 0, 0.55),
    0 0 80px rgba(43, 191, 184, 0.1);
}

.capability-showcase__card:hover:not(.is-active) .capability-showcase__card-inner {
  border-color: rgba(43, 191, 184, 0.22);
  opacity: 1;
}

.capability-showcase__index {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  color: var(--accent-soft-hex);
  transition: color 0.35s ease;
}

.capability-showcase__title {
  margin-top: 0.75rem;
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: var(--foreground);
  transition: transform 0.55s var(--ease-out-premium);
}

.capability-showcase__card.is-active .capability-showcase__title {
  transform: translateY(0);
}

.capability-showcase__accent {
  margin-top: 1.25rem;
  height: 1px;
  width: 3.5rem;
  background: linear-gradient(90deg, var(--accent-soft-hex), transparent);
  opacity: 0.5;
  transition:
    width 0.55s var(--ease-out-premium),
    opacity 0.45s ease;
}

.capability-showcase__card.is-active .capability-showcase__accent {
  width: 5.5rem;
  opacity: 1;
}

.capability-showcase__list {
  margin-top: 1.75rem;
  display: grid;
  gap: 0.85rem;
}

.capability-showcase__bullet {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: 0.95rem;
  line-height: 1.55;
  color: var(--muted-foreground);
  opacity: 0;
  transform: translate3d(-10px, 0, 0);
}

.capability-showcase__bullet.is-visible {
  animation: capability-bullet-in 0.5s var(--ease-out-premium) forwards;
}

.capability-showcase__bullet-dot {
  margin-top: 0.55rem;
  height: 0.4rem;
  width: 0.4rem;
  flex-shrink: 0;
  border-radius: 9999px;
  background: var(--accent-soft-hex);
  box-shadow: 0 0 10px rgba(43, 191, 184, 0.55);
}

.capability-showcase__nav {
  position: absolute;
  top: 50%;
  z-index: 2;
  display: grid;
  height: 2.75rem;
  width: 2.75rem;
  place-items: center;
  border-radius: 9999px;
  border: 1px solid var(--border-soft);
  background: rgba(4, 8, 10, 0.82);
  color: var(--foreground);
  backdrop-filter: blur(12px);
  transform: translateY(-50%);
  transition:
    border-color 0.25s ease,
    background 0.25s ease,
    color 0.25s ease,
    transform 0.25s ease;
}

.capability-showcase__nav:hover {
  border-color: rgba(43, 191, 184, 0.45);
  color: var(--accent-glow-hex);
  transform: translateY(-50%) scale(1.05);
}

.capability-showcase__nav:focus-visible {
  outline: 2px solid var(--accent-glow-hex);
  outline-offset: 3px;
}

.capability-showcase__nav--prev {
  left: 0.25rem;
}

.capability-showcase__nav--next {
  right: 0.25rem;
}

@media (min-width: 1024px) {
  .capability-showcase__nav--prev {
    left: -0.25rem;
  }

  .capability-showcase__nav--next {
    right: -0.25rem;
  }
}

.capability-showcase__footer {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.capability-showcase__dots {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
}

.capability-showcase__dot {
  height: 0.45rem;
  width: 0.45rem;
  border-radius: 9999px;
  background: rgba(236, 242, 239, 0.2);
  transition:
    width 0.35s var(--ease-out-premium),
    background 0.35s ease;
}

.capability-showcase__dot.is-active {
  width: 1.75rem;
  background: var(--accent-soft-hex);
}

.capability-showcase__dot:focus-visible {
  outline: 2px solid var(--accent-glow-hex);
  outline-offset: 3px;
}

.capability-showcase__counter {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.8rem;
  letter-spacing: 0.12em;
}

@keyframes capability-bullet-in {
  from {
    opacity: 0;
    transform: translate3d(-10px, 0, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .capability-showcase__viewport {
    scroll-behavior: auto;
  }

  .capability-showcase__card,
  .capability-showcase__card-inner,
  .capability-showcase__glow,
  .capability-showcase__title,
  .capability-showcase__accent {
    transition: none;
  }

  .capability-showcase__card {
    transform: none;
    opacity: 1;
    filter: none;
  }

  .capability-showcase__bullet {
    opacity: 1;
    transform: none;
    animation: none;
  }
}
</style>
