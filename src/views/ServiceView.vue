<script setup lang="ts">
import { computed } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'

import ServicePageBenefits from '@/components/service/ServicePageBenefits.vue'
import ServicePageCta from '@/components/service/ServicePageCta.vue'
import ServicePageHero from '@/components/service/ServicePageHero.vue'
import ServicePageNav from '@/components/service/ServicePageNav.vue'
import ServicePageOfferings from '@/components/service/ServicePageOfferings.vue'
import ServicePageProcess from '@/components/service/ServicePageProcess.vue'
import AuroraBackdrop from '@/components/visuals/AuroraBackdrop.vue'
import SiteContainer from '@/components/SiteContainer.vue'
import { useAnimationCycle } from '@/composables'
import { APP_NAME } from '@/constants'
import { getServiceBySlug, getServiceIndex, SERVICE_PAGES, servicePath } from '@/constants/servicePages'
import { homeSectionTarget } from '@/lib/navigation'
import type { ServicePage } from '@/types'

const route = useRoute()
const siteUrl = import.meta.env.VITE_SITE_URL || ''
const { cycleKey, resetAnimationCycle } = useAnimationCycle()

const activeIndex = computed<number>(() => {
  const slug = String(route.params.slug ?? '')
  return getServiceIndex(slug)
})

const activeService = computed<ServicePage | null>(() => {
  const slug = String(route.params.slug ?? '')
  return getServiceBySlug(slug) ?? null
})

const pageKey = computed(() =>
  activeService.value ? `${activeService.value.slug}-${cycleKey.value}` : 'service-missing',
)

const previousService = computed<ServicePage | null>(() => {
  if (activeIndex.value === -1) return null
  const total = SERVICE_PAGES.length
  const idx = (activeIndex.value - 1 + total) % total
  return SERVICE_PAGES[idx] ?? null
})

const nextService = computed<ServicePage | null>(() => {
  if (activeIndex.value === -1) return null
  const total = SERVICE_PAGES.length
  const idx = (activeIndex.value + 1) % total
  return SERVICE_PAGES[idx] ?? null
})

const hasService = computed<boolean>(() => activeService.value !== null)

onBeforeRouteUpdate(async (to, from) => {
  if (to.params.slug !== from.params.slug) {
    await resetAnimationCycle()
  }
})

useHead({
  title: computed(() =>
    activeService.value
      ? `${activeService.value.title} | ${APP_NAME}`
      : `Service | ${APP_NAME}`,
  ),
  meta: [
    {
      name: 'description',
      content: computed(() => activeService.value?.seoDescription ?? ''),
    },
    {
      property: 'og:title',
      content: computed(() =>
        activeService.value
          ? `${activeService.value.title} | ${APP_NAME}`
          : `Service | ${APP_NAME}`,
      ),
    },
    {
      property: 'og:description',
      content: computed(() => activeService.value?.seoDescription ?? ''),
    },
    { property: 'og:type', content: 'website' },
    {
      property: 'og:url',
      content: computed(() =>
        siteUrl && activeService.value
          ? `${siteUrl}${servicePath(activeService.value.slug)}`
          : undefined,
      ),
    },
    {
      property: 'og:image',
      content: siteUrl ? `${siteUrl}/og-default.png` : undefined,
    },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { name: 'twitter:card', content: 'summary_large_image' },
    {
      name: 'twitter:title',
      content: computed(() => activeService.value?.title ?? `Service | ${APP_NAME}`),
    },
    {
      name: 'twitter:description',
      content: computed(() => activeService.value?.seoDescription ?? ''),
    },
    {
      name: 'twitter:image',
      content: siteUrl ? `${siteUrl}/og-default.png` : undefined,
    },
  ],
  link: [
    {
      rel: 'canonical',
      href: computed(() =>
        siteUrl && activeService.value
          ? `${siteUrl}${servicePath(activeService.value.slug)}`
          : undefined,
      ),
    },
  ],
  script: computed(() => {
    if (!activeService.value || !siteUrl) return []
    return [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: activeService.value.title,
          description: activeService.value.seoDescription,
          provider: {
            '@type': 'Organization',
            name: APP_NAME,
            url: siteUrl,
          },
          url: `${siteUrl}${servicePath(activeService.value.slug)}`,
        }),
      },
    ]
  }),
})
</script>

<template>
  <article
    v-if="hasService && activeService"
    :key="pageKey"
    class="service-page route-fade relative overflow-x-clip"
  >
    <AuroraBackdrop variant="soft" class="service-page__aurora" />
    <div class="dot-grid pointer-events-none absolute inset-x-0 top-0 -z-10 h-[120vh] opacity-40" aria-hidden="true" />
    <div class="noise pointer-events-none absolute inset-x-0 top-0 -z-10 h-[120vh]" aria-hidden="true" />

    <ServicePageHero :service="activeService" :cycle-key="cycleKey" />
    <ServicePageOfferings :offerings="activeService.offerings" :cycle-key="cycleKey" />
    <ServicePageProcess :steps="activeService.process" :cycle-key="cycleKey" />
    <ServicePageBenefits
      :benefits="activeService.benefits"
      :benefits-description="activeService.benefitsDescription"
      :cycle-key="cycleKey"
    />
    <ServicePageCta
      :headline="activeService.cta.headline"
      :description="activeService.cta.description"
      :cycle-key="cycleKey"
    />
    <ServicePageNav :previous="previousService" :next="nextService" />
  </article>

  <section v-else class="section-y route-fade relative overflow-hidden">
    <SiteContainer class="text-center">
      <h1 class="section-title">Service not found</h1>
      <p class="section-description mx-auto mt-4">That service page is not on our site.</p>
      <RouterLink :to="homeSectionTarget('services')" class="btn-primary-pill mt-8">Back to services</RouterLink>
    </SiteContainer>
  </section>
</template>

<style scoped>
.service-page__aurora {
  position: absolute;
  inset: 0;
  height: 100%;
  min-height: 100vh;
  pointer-events: none;
}
</style>
