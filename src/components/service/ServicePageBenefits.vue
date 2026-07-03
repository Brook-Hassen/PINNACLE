<script setup lang="ts">
import SiteContainer from '@/components/SiteContainer.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import SpotlightCard from '@/components/ui/SpotlightCard.vue'
import type { ServiceBenefit } from '@/types'

interface Props {
  benefits: readonly ServiceBenefit[]
  benefitsDescription?: string
  cycleKey: number
}

defineProps<Props>()
</script>

<template>
  <section class="section-y relative border-t border-border/40">
    <SiteContainer>
      <SectionHeading
        centered
        tag="Benefits"
        title="Outcomes that"
        highlight=" move the needle."
        :description="
          benefitsDescription ??
          'ROI-focused results, not vanity metrics. Here is what changes after delivery.'
        "
        :cycle-key="cycleKey"
      />

      <div class="mt-16 grid gap-4 sm:grid-cols-2">
        <SpotlightCard
          v-for="(benefit, i) in benefits"
          :key="`${cycleKey}-${benefit.id}`"
          v-reveal="{ delay: (i % 2) * 80, cycleKey }"
          class="card-pad"
        >
          <h3 class="card-title mb-3">{{ benefit.title }}</h3>
          <p class="text-base leading-relaxed text-muted-foreground">{{ benefit.description }}</p>
        </SpotlightCard>
      </div>
    </SiteContainer>
  </section>
</template>
