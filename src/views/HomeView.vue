<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import CaseStudies from '@/components/CaseStudies.vue'

import { BENEFITS, FAQ_ITEMS, SERVICES, STATS } from '@/constants'

const HeroSection = defineAsyncComponent(() => import('@/sections/HeroSection.vue'))
const CapabilitiesSection = defineAsyncComponent(() => import('@/sections/CapabilitiesSection.vue'))
const BenefitsSection = defineAsyncComponent(() => import('@/sections/BenefitsSection.vue'))
const StatsSection = defineAsyncComponent(() => import('@/sections/StatsSection.vue'))
const FaqSection = defineAsyncComponent(() => import('@/sections/FaqSection.vue'))
</script>

<template>
  <div>
    <HeroSection />
    <CapabilitiesSection :services="SERVICES" />
    <BenefitsSection :benefits="BENEFITS" />
    <CaseStudies />
    <StatsSection :stats="STATS" />
    <FaqSection :items="FAQ_ITEMS" />
  </div>
</template>
