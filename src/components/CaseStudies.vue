<script setup lang="ts">
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
</script>

<template>
  <section id="case-studies" class="bg-background py-12 font-sans sm:py-16">
    <SiteContainer>
      <h2 class="mb-6 text-5xl font-semibold leading-none tracking-tight text-foreground sm:text-6xl">
        Case Studies
      </h2>

      <div class="cs-viewport">
        <div class="cs-scale-wrap">
          <div class="cs-scale-inner flex items-start gap-[8px]">
            <div
              v-if="getCase(1)"
              class="card relative shrink-0 cursor-pointer bg-card"
              style="
                width: 165px;
                height: 360px;
                clip-path: path('M 22,0 L 143,0 Q 165,0 165,22 L 165,338 Q 165,360 143,360 L 22,360 Q 0,360 0,338 L 0,22 Q 0,0 22,0 Z');
              "
            >
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
            </div>

            <div class="relative shrink-0" style="width: 449px; height: 360px">
              <div
                v-if="getCase(2)"
                class="card absolute inset-0 cursor-pointer bg-card"
                style="clip-path: path('M 22,0 L 427,0 Q 449,0 449,22 L 449,338 Q 449,360 427,360 L 217,360 Q 195,360 195,338 L 195,220 Q 195,200 217,200 L 22,200 Q 0,200 0,178 L 0,22 Q 0,0 22,0 Z');"
              >
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
              </div>

              <div
                v-if="getCase(3)"
                class="card absolute cursor-pointer bg-card"
                style="
                  left: 8px;
                  top: 208px;
                  width: 179px;
                  height: 144px;
                  clip-path: path('M 18,0 L 161,0 Q 179,0 179,18 L 179,126 Q 179,144 161,144 L 18,144 Q 0,144 0,126 L 0,18 Q 0,0 18,0 Z');
                "
              >
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
              </div>
            </div>
          </div>
        </div>
      </div>

      <p class="mt-6 max-w-[42rem] text-sm leading-relaxed text-muted-foreground sm:text-base">
        A collection of engineered solutions and visual identities. We partner with ambitious brands to
        solve complex challenges through high-performance development and strategic design.
      </p>
    </SiteContainer>
  </section>
</template>

<style scoped>
.card {
  transition: background-color 220ms ease;
}

.card:hover {
  background-color: #222 !important;
}

.card:hover .vm-btn {
  border-color: rgba(255, 255, 255, 0.35);
  color: rgba(255, 255, 255, 0.9);
}

.cs-viewport {
  overflow-x: auto;
}

.cs-scale-wrap {
  --cs-scale: 1;
  width: calc(622px * var(--cs-scale));
  min-width: calc(622px * var(--cs-scale));
  height: calc(360px * var(--cs-scale));
}

.cs-scale-inner {
  width: 622px;
  transform: scale(var(--cs-scale));
  transform-origin: top left;
}

@media (min-width: 768px) {
  .cs-scale-wrap {
    --cs-scale: 1.45;
  }
}

@media (min-width: 1200px) {
  .cs-scale-wrap {
    --cs-scale: 1.65;
  }
}
</style>
