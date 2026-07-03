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
          class="text-center"
        >
          <p class="text-6xl font-light leading-none sm:text-7xl">
            <AnimatedNumber :value="item.value" class="text-shimmer" />
          </p>
          <p class="mt-3 text-base uppercase tracking-[0.16em] text-muted-foreground sm:text-lg">
            {{ item.label }}
          </p>
        </article>
      </div>
    </SiteContainer>
  </section>
</template>
