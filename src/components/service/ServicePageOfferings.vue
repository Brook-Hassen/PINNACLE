<script setup lang="ts">
import ServiceCapabilityShowcase from '@/components/service/ServiceCapabilityShowcase.vue'
import SiteContainer from '@/components/SiteContainer.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import type { ServiceOfferingGroup } from '@/types'

interface Props {
  offerings: readonly ServiceOfferingGroup[]
  cycleKey: number
}

defineProps<Props>()
</script>

<template>
  <section class="section-y relative overflow-hidden border-t border-border/40">
    <SiteContainer>
      <SectionHeading
        centered
        tag="What we offer"
        title="Everything included"
        highlight=" in this service."
        description="Each capability below is a workstream we run end to end. Pick one to see what is included."
        :cycle-key="cycleKey"
      />

      <ServiceCapabilityShowcase :offerings="offerings" :cycle-key="cycleKey" />
    </SiteContainer>
  </section>
</template>
