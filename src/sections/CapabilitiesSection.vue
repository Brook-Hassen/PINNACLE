<script setup lang="ts">
import SiteContainer from '@/components/SiteContainer.vue'
import type { ServiceItem } from '@/types'

interface Props {
  services: readonly ServiceItem[]
}

defineProps<Props>()

const partnerLogos = ['JASIRI', 'Eaglepoint', 'SOLAR 23', 'Google', '[Cog] anyone can code', 'beu delivery']
</script>

<template>
  <section id="services" class="py-12 sm:py-16">
    <SiteContainer>
      <div class="grid grid-cols-2 gap-y-4 pb-12 pt-3 text-center sm:grid-cols-3 lg:grid-cols-6">
        <p v-for="logo in partnerLogos" :key="logo" class="text-sm font-semibold text-muted-foreground sm:text-base">
          {{ logo }}
        </p>
      </div>

      <p class="text-2xl text-muted-foreground">Our Capabilities</p>
      <h2 class="mt-1 text-5xl font-semibold leading-none text-foreground sm:text-6xl">What We Build</h2>
      <p class="mt-3 max-w-3xl text-base text-muted-foreground sm:text-lg">
        We provide the technical and creative infrastructure required to scale modern brands.
      </p>

      <div class="mt-12 grid gap-x-8 gap-y-12 lg:grid-cols-3">
        <article v-for="service in services" :key="service.id" class="pr-4">
          <div class="h-12 w-12 rounded-full bg-[#d9d9d9]" />
          <h3 class="mt-5 text-3xl font-semibold leading-tight text-foreground">{{ service.title }}</h3>
          <p class="mt-3 text-lg leading-relaxed text-muted-foreground">{{ service.description }}</p>
        </article>
      </div>
    </SiteContainer>
  </section>
</template>
