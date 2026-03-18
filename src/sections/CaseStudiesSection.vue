<script setup lang="ts">
import { computed } from 'vue'

import SiteContainer from '@/components/SiteContainer.vue'
import type { CaseStudy } from '@/types'

interface Props {
  caseStudies: readonly CaseStudy[]
}

const props = defineProps<Props>()

const primaryStudies = computed(() => props.caseStudies.slice(0, 3))
</script>

<template>
  <section id="case-studies" class="bg-black py-16 text-white">
    <SiteContainer>
      <h2 class="text-4xl font-bold text-white md:text-5xl">Case Studies</h2>

      <div class="mt-8 hidden gap-6 md:grid md:grid-cols-3 md:auto-rows-fr">
        <article
          v-for="study in primaryStudies"
          :key="study.id"
          :class="[
            'relative rounded-2xl bg-gray-900 p-6',
            study.id === primaryStudies[0]?.id ? 'min-h-[360px] md:row-span-2' : '',
            study.id === primaryStudies[1]?.id ? 'min-h-[270px] md:col-span-2' : '',
            study.id === primaryStudies[2]?.id ? 'min-h-[220px] md:col-start-2' : '',
          ]"
        >
          <div class="mb-4 h-48 rounded-lg bg-gray-800/60" />
          <RouterLink
            :to="`/case-studies/${study.slug}`"
            class="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full border border-gray-500 px-3 py-1 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            <span>View more</span>
            <span
              class="inline-flex h-5 w-5 items-center justify-center rounded-full border border-gray-500 text-[10px]"
            >
              ↗
            </span>
          </RouterLink>
        </article>
      </div>

      <div class="mt-8 grid gap-4 md:hidden">
        <article
          v-for="study in primaryStudies"
          :key="`mobile-${study.id}`"
          class="relative min-h-[240px] rounded-2xl bg-gray-900 p-6"
        >
          <div class="mb-4 h-40 rounded-lg bg-gray-800/60" />
          <RouterLink
            :to="`/case-studies/${study.slug}`"
            class="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full border border-gray-500 px-3 py-1 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            <span>View more</span>
            <span
              class="inline-flex h-5 w-5 items-center justify-center rounded-full border border-gray-500 text-[10px]"
            >
              ↗
            </span>
          </RouterLink>
        </article>
      </div>

      <p class="mt-8 max-w-3xl text-sm leading-relaxed text-gray-400 sm:text-base">
        A collection of engineered solutions and visual identities. We partner with ambitious brands to
        solve complex challenges through high-performance development and strategic design.
      </p>
    </SiteContainer>
  </section>
</template>
