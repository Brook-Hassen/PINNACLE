<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import CaseStudyMediaBlock from '@/components/CaseStudyMediaBlock.vue'
import SiteContainer from '@/components/SiteContainer.vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CASE_STUDIES } from '@/constants'
import type { CaseStudy } from '@/types'

const route = useRoute()

const activeCaseStudy = computed<CaseStudy | null>(() => {
  const slug = String(route.params.slug ?? '')
  return CASE_STUDIES.find((item) => item.slug === slug) ?? null
})

const detailParagraphs = computed<string[]>(() => activeCaseStudy.value?.details ?? [])

const hasCaseStudy = computed<boolean>(() => activeCaseStudy.value !== null)

const title = computed<string>(() => activeCaseStudy.value?.title ?? 'Case Study Not Found')

const category = computed<string>(() => activeCaseStudy.value?.category ?? 'Unavailable')

const summary = computed<string>(
  () => activeCaseStudy.value?.summary ?? 'The requested case study could not be located.',
)

const mediaItems = computed(() => activeCaseStudy.value?.media ?? [])
</script>

<template>
  <section class="py-16 sm:py-20">
    <SiteContainer>
      <div class="space-y-8">
        <div class="space-y-4">
          <Badge>{{ category }}</Badge>
          <h1 class="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{{ title }}</h1>
          <p class="max-w-3xl text-base leading-relaxed text-muted-foreground">{{ summary }}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Project Breakdown</CardTitle>
          </CardHeader>
          <CardContent class="space-y-4">
            <template v-if="hasCaseStudy">
              <p v-for="(paragraph, index) in detailParagraphs" :key="`${title}-${index}`" class="text-sm leading-7">
                {{ paragraph }}
              </p>
            </template>
            <p v-else class="text-sm leading-7 text-muted-foreground">
              Return to the home page and select another project from the case studies section.
            </p>
          </CardContent>
        </Card>

        <div v-if="mediaItems.length" class="grid gap-4 md:grid-cols-2">
          <CaseStudyMediaBlock
            v-for="item in mediaItems"
            :key="item.id"
            :media="item"
            height-class="h-60"
            controls
          />
        </div>

        <RouterLink to="/#case-studies">
          <Button variant="secondary">Back to Work</Button>
        </RouterLink>
      </div>
    </SiteContainer>
  </section>
</template>
