<script setup lang="ts">
import SiteContainer from '@/components/SiteContainer.vue'
import type { BenefitItem } from '@/types'

interface Props {
  benefits: readonly BenefitItem[]
}

defineProps<Props>()
</script>

<template>
  <section id="work" class="py-12 sm:py-16">
    <SiteContainer>
      <p class="max-w-4xl text-3xl font-medium leading-tight text-foreground sm:text-5xl">
        Frustrated with finding the perfect digital designer hire?
      </p>
      <p class="mt-3 max-w-4xl text-lg leading-snug text-muted-foreground sm:text-2xl">
        PINNACLE AI offers fast, reliable and superior design by senior creatives on tap immediately.
      </p>

      <div class="mt-8 flex gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0">
        <article
          v-for="benefit in benefits"
          :key="benefit.id"
          class="relative min-w-[240px] rounded-3xl border border-border bg-card px-5 pb-6 pt-10 lg:min-w-0"
        >
          <div class="absolute left-4 top-4 h-8 w-8 rounded-full bg-[#dfdfdf]" />
          <h3 class="text-2xl font-semibold leading-tight text-card-foreground lg:text-3xl">{{ benefit.title }}</h3>
          <p class="mt-2 text-sm leading-snug text-muted-foreground lg:text-base">{{ benefit.description }}</p>
        </article>
      </div>
    </SiteContainer>
  </section>
</template>
