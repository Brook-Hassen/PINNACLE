<script setup lang="ts">
import SiteContainer from '@/components/SiteContainer.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import type { ServicePortfolioItem } from '@/types'

interface Props {
  items: readonly ServicePortfolioItem[]
  cycleKey: number
}

defineProps<Props>()
</script>

<template>
  <section class="section-y relative border-t border-border/40">
    <SiteContainer>
      <SectionHeading
        centered
        tag="Selected work"
        title="Real projects,"
        highlight=" real outcomes."
        description="A few recent engagements: what the client needed, what we shipped, and what changed for their team."
        :cycle-key="cycleKey"
      />

      <div class="mt-16 space-y-6">
        <article
          v-for="(item, i) in items"
          :key="`${cycleKey}-${item.id}`"
          v-reveal="{ delay: i * 80, cycleKey }"
          class="overflow-hidden rounded-[var(--radius-card-lg)] border border-border/50 bg-card/20"
        >
          <div class="grid lg:grid-cols-[minmax(0,0.34fr)_minmax(0,0.66fr)]">
            <div
              class="flex flex-col justify-between border-b border-border/40 bg-background/60 p-6 sm:p-8 lg:border-b-0 lg:border-r"
            >
              <div>
                <p class="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent-soft-hex)]">
                  {{ item.category }}
                </p>
                <p class="portfolio-card__index mt-6 font-light text-[var(--accent-soft-hex)]">
                  {{ String(i + 1).padStart(2, '0') }}
                </p>
              </div>
              <p class="mt-8 text-sm leading-relaxed text-muted-foreground lg:mt-0">
                {{ item.outcome }}
              </p>
            </div>

            <div class="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
              <h3 class="text-2xl font-semibold text-foreground">{{ item.title }}</h3>
              <p class="mt-4 text-base leading-relaxed text-muted-foreground">{{ item.description }}</p>

              <div class="mt-8">
                <p class="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/70">
                  What we delivered
                </p>
                <ul class="mt-4 space-y-2">
                  <li
                    v-for="deliverable in item.delivered"
                    :key="deliverable"
                    class="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
                  >
                    <span
                      class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-soft-hex)]"
                      aria-hidden="true"
                    />
                    {{ deliverable }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </article>
      </div>
    </SiteContainer>
  </section>
</template>

<style scoped>
.portfolio-card__index {
  font-size: clamp(3rem, 6vw, 4.5rem);
  line-height: 1;
  letter-spacing: -0.04em;
}
</style>
