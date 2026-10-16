<script setup lang="ts">
import SiteContainer from '@/components/SiteContainer.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import AnimatedNumber from '@/components/ui/AnimatedNumber.vue'
import type { StatItem } from '@/types'

interface Props {
  stats: readonly StatItem[]
}

defineProps<Props>()
</script>

<template>
  <section
    id="team"
    class="section-y section-grid-bg relative overflow-hidden"
  >
    <SiteContainer class="relative z-10">
      <SectionHeading
        centered
        tag="Our impact"
        title="Numbers earned through"
        highlight=" shipped work."
      />

      <div class="mt-16 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <article
          v-for="(item, i) in stats"
          :key="item.id"
          v-reveal="{ delay: i * 80 }"
          class="stat-card text-center"
        >
          <p class="font-display text-5xl font-semibold leading-none tracking-tight sm:text-6xl">
            <AnimatedNumber :value="item.value" class="text-shimmer" />
          </p>
          <p class="mt-4 font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground sm:text-xs">
            {{ item.label }}
          </p>
        </article>
      </div>
    </SiteContainer>
  </section>
</template>
