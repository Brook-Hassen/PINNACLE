<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import SiteContainer from '@/components/SiteContainer.vue'

type Pos = 'bottom-left' | 'bottom-right' | 'bottom-center'

interface CaseStudy {
  id: number
  title: string
  to: string
}

const cases: CaseStudy[] = [
  { id: 1, title: 'Brand Identity & Systems', to: '/case-studies/work-1' },
  { id: 2, title: 'High-Performance Web App', to: '/case-studies/brand-ops-suite' },
  { id: 3, title: 'Strategic Design Sprint', to: '/case-studies/launch-growth-kit' },
]

const getCase = (id: number): CaseStudy | undefined => cases.find((item) => item.id === id)

const posClass: Record<Pos, string> = {
  'bottom-left': 'bottom-[13px] left-[13px]',
  'bottom-right': 'bottom-[13px] right-[13px]',
  'bottom-center': 'bottom-[13px] left-1/2 -translate-x-1/2',
}

const caseNoteLines = [
  'A collection of engineered solutions and visual identities. We partner with ambitious brands to solve complex challenges',
  'through high-performance development and strategic design.',
] as const

type CaseNoteLineIndex = 0 | 1

const caseNoteText = caseNoteLines.join(' ')

const typedNoteLines = ref<[string, string]>(['', ''])
const noteRef = ref<HTMLElement | null>(null)
const activeNoteLine = ref(0)

let typingTimer: number | null = null
let noteObserver: IntersectionObserver | null = null
let motionQuery: MediaQueryList | null = null

const stopTyping = () => {
  if (typingTimer !== null) {
    window.clearInterval(typingTimer)
    typingTimer = null
  }
}

const startTyping = () => {
  if (typedNoteLines.value.every((line, index) => line.length === (caseNoteLines[index as CaseNoteLineIndex] ?? '').length)) {
    return
  }

  stopTyping()
  typedNoteLines.value = ['', '']
  activeNoteLine.value = 0

  let lineIndex: CaseNoteLineIndex = 0
  let charIndex = 0

  typingTimer = window.setInterval(() => {
    const currentLine = caseNoteLines[lineIndex] ?? ''

    charIndex += 1
    typedNoteLines.value[lineIndex] = currentLine.slice(0, charIndex)
    activeNoteLine.value = lineIndex

    if (charIndex >= currentLine.length) {
      if (lineIndex >= caseNoteLines.length - 1) {
        stopTyping()
        return
      }

      lineIndex = 1
      charIndex = 0
      activeNoteLine.value = lineIndex
    }
  }, 26)
}

onMounted(() => {
  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

  if (motionQuery.matches) {
    typedNoteLines.value = [caseNoteLines[0], caseNoteLines[1]]
    activeNoteLine.value = caseNoteLines.length - 1
    return
  }

  if (!('IntersectionObserver' in window) || !noteRef.value) {
    startTyping()
    return
  }

  noteObserver = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        startTyping()
        noteObserver?.disconnect()
        noteObserver = null
      }
    },
    { threshold: 0.4 },
  )

  noteObserver.observe(noteRef.value)
})

onBeforeUnmount(() => {
  stopTyping()
  noteObserver?.disconnect()
})
</script>

<template>
  <section id="case-studies" class="bg-background py-12 font-sans sm:py-16">
    <SiteContainer>
      <h2 class="mb-6 text-5xl font-semibold leading-none tracking-tight text-foreground sm:text-6xl">
        Case Studies
      </h2>

      <div class="case-grid">
        <article v-if="getCase(1)" class="card case-card case-card--tall">
          <RouterLink
            :to="getCase(1)!.to"
            :aria-label="`View case study: ${getCase(1)!.title}`"
            class="vm-btn absolute inline-flex items-center gap-[6px] rounded-full border border-white/15 bg-transparent px-[12px] py-[5px] font-sans text-[10.5px] whitespace-nowrap text-white/60 transition-all duration-200"
            :class="posClass['bottom-left']"
          >
            <span>View more</span>
            <span
              class="flex h-[17px] w-[17px] shrink-0 items-center justify-center rounded-full border border-white/20 text-[8px] transition-colors duration-200"
            >
              ↗
            </span>
          </RouterLink>
        </article>

        <div class="case-cluster">
          <article v-if="getCase(2)" class="card case-card case-card--l">
            <RouterLink
              :to="getCase(2)!.to"
              :aria-label="`View case study: ${getCase(2)!.title}`"
              class="vm-btn absolute inline-flex items-center gap-[6px] rounded-full border border-white/15 bg-transparent px-[12px] py-[5px] font-sans text-[10.5px] whitespace-nowrap text-white/60 transition-all duration-200"
              :class="posClass['bottom-right']"
            >
              <span>View more</span>
              <span
                class="flex h-[17px] w-[17px] shrink-0 items-center justify-center rounded-full border border-white/20 text-[8px] transition-colors duration-200"
              >
                ↗
              </span>
            </RouterLink>
          </article>

          <article v-if="getCase(3)" class="card case-card case-card--small">
            <RouterLink
              :to="getCase(3)!.to"
              :aria-label="`View case study: ${getCase(3)!.title}`"
              class="vm-btn absolute inline-flex items-center gap-[6px] rounded-full border border-white/15 bg-transparent px-[12px] py-[5px] font-sans text-[10.5px] whitespace-nowrap text-white/60 transition-all duration-200"
              :class="posClass['bottom-center']"
            >
              <span>View more</span>
              <span
                class="flex h-[17px] w-[17px] shrink-0 items-center justify-center rounded-full border border-white/20 text-[8px] transition-colors duration-200"
              >
                ↗
              </span>
            </RouterLink>
          </article>
        </div>
      </div>

      <div ref="noteRef" class="case-note-wrap mt-6 pb-1">
        <p class="case-note" :aria-label="caseNoteText">
          <span class="case-note__line">
            {{ typedNoteLines[0] }}
            <span
              v-if="activeNoteLine === 0"
              class="case-note__cursor"
              aria-hidden="true"
            ></span>
          </span>
          <span class="case-note__line">
            {{ typedNoteLines[1] }}
            <span
              v-if="activeNoteLine === 1"
              class="case-note__cursor"
              aria-hidden="true"
            ></span>
          </span>
        </p>
      </div>
    </SiteContainer>
  </section>
</template>

<style scoped>
.card {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: linear-gradient(180deg, rgba(30, 30, 35, 0.94), rgba(19, 19, 24, 0.98));
  transition:
    background-color 220ms ease,
    transform 260ms ease,
    border-color 220ms ease;
}

.card::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at top left, rgba(255, 255, 255, 0.06), transparent 34%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.02), transparent 58%);
  pointer-events: none;
}

.card:hover {
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.14);
  background-color: #222 !important;
}

.card:hover .vm-btn {
  border-color: rgba(255, 255, 255, 0.35);
  color: rgba(255, 255, 255, 0.9);
}

.case-grid {
  --case-gap: clamp(0.75rem, 1.1vw, 1rem);
  --case-radius: clamp(1.35rem, 2vw, 1.9rem);
  display: grid;
  gap: var(--case-gap);
}

.case-card {
  border-radius: var(--case-radius);
}

.case-card--tall {
  min-height: 18rem;
}

.case-cluster {
  --small-card-width: clamp(11rem, 33%, 14rem);
  --small-card-height: clamp(8.75rem, 41%, 11rem);
  --notch-radius: clamp(1.7rem, 2.35vw, 2.35rem);
  position: relative;
  min-height: 20rem;
}

.case-card--l {
  position: absolute;
  inset: 0;
}

.case-card--l::after {
  content: '';
  position: absolute;
  left: -1px;
  bottom: -1px;
  width: calc(var(--small-card-width) + var(--case-gap) + 2px);
  height: calc(var(--small-card-height) + var(--case-gap) + 2px);
  background: var(--background);
  border-top-left-radius: var(--notch-radius);
  border-top-right-radius: calc(var(--notch-radius) * 1.02);
  border-bottom-right-radius: var(--notch-radius);
  box-shadow: 0 0 0 1px var(--background);
  pointer-events: none;
  z-index: 1;
}

.case-card--small {
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 2;
  width: var(--small-card-width);
  min-height: var(--small-card-height);
}

.case-note-wrap {
  max-width: 52rem;
}

.case-note {
  color: color-mix(in oklab, var(--foreground) 68%, #61d784 32%);
  font-family: 'IBM Plex Mono', 'JetBrains Mono', 'SFMono-Regular', ui-monospace, monospace;
  font-size: clamp(0.82rem, 1vw, 0.96rem);
  line-height: 1.75;
  letter-spacing: 0.02em;
  text-shadow: 0 0 14px rgba(97, 215, 132, 0.12);
}

.case-note__line {
  display: block;
  min-height: 1.75em;
  white-space: nowrap;
}

.case-note__cursor {
  display: inline-block;
  width: 0.62em;
  height: 1.1em;
  margin-left: 0.1em;
  transform: translateY(0.14em);
  background: currentColor;
  animation: case-note-blink 1s steps(1) infinite;
}

@keyframes case-note-blink {
  0%,
  48% {
    opacity: 1;
  }

  49%,
  100% {
    opacity: 0;
  }
}

@media (min-width: 768px) {
  .case-grid {
    grid-template-columns: minmax(14rem, 0.78fr) minmax(0, 1.42fr);
    align-items: stretch;
  }

  .case-card--tall,
  .case-cluster {
    min-height: clamp(21rem, 42vw, 31rem);
  }
}

@media (min-width: 1200px) {
  .case-grid {
    grid-template-columns: minmax(15rem, 0.72fr) minmax(0, 1.48fr);
  }
}

@media (prefers-reduced-motion: reduce) {
  .case-note__cursor {
    animation: none;
  }
}
</style>
