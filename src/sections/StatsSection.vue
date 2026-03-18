<script setup lang="ts">
import SiteContainer from '@/components/SiteContainer.vue'
import type { StatItem } from '@/types'

interface Props {
  stats: readonly StatItem[]
}

defineProps<Props>()
</script>

<template>
  <section class="border-y border-border py-10 sm:py-12">
    <SiteContainer>
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <article v-for="item in stats" :key="item.id" class="text-left">
          <p class="text-6xl font-light leading-none text-foreground sm:text-7xl">{{ item.value }}</p>
          <p class="mt-2 text-xl text-muted-foreground sm:text-2xl">{{ item.label }}</p>
        </article>
      </div>
    </SiteContainer>
  </section>
</template>
