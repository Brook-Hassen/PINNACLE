<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { APP_NAME, BENEFITS, COMPANY_SOCIALS, FAQ_ITEMS, SERVICES, STATS } from '@/constants'

/**
 * Sections are imported EAGERLY (not via defineAsyncComponent).
 *
 * Reason: these sections are server-rendered by vite-ssg. Wrapping them in
 * `defineAsyncComponent` with a `loadingComponent` made the client throw the
 * prerendered DOM away during hydration and render short skeletons until each
 * chunk resolved — collapsing the page height (~7.5k→1.9k) and rebuilding it on
 * every reload (the visible "renders wrong, then settles" flicker). Eager
 * imports let the prerendered markup hydrate in place: stable from first paint.
 *
 * The only genuinely heavy dependency (Three.js, inside the hero cube) stays
 * code-split — it is lazy-loaded INSIDE HeroSection.vue — so the bundle/initial
 * paint cost is unchanged.
 */
import HeroSection from '@/sections/HeroSection.vue'
import CapabilitiesSection from '@/sections/CapabilitiesSection.vue'
import BenefitsSection from '@/sections/BenefitsSection.vue'
import StatsSection from '@/sections/StatsSection.vue'
import CtaSection from '@/sections/CtaSection.vue'
import FaqSection from '@/sections/FaqSection.vue'

// FAQ-TOGGLE: flip to `false` to hide the FAQ section. All FAQ code, data, types, and imports are preserved.
const SHOW_FAQ = true

const siteUrl = import.meta.env.VITE_SITE_URL || ''
const description =
  'Senior designers, engineers, and strategists on one team. Brand systems, product builds, and launch support with delivery cycles measured in days, not quarters.'

const sameAs = COMPANY_SOCIALS.map((s) => s.href).filter((href): href is string => Boolean(href))
const organizationLd: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: APP_NAME,
  description,
}
if (siteUrl) {
  organizationLd.url = siteUrl
  organizationLd.logo = `${siteUrl}/og-default.png`
}
if (sameAs.length) {
  organizationLd.sameAs = sameAs
}

useHead({
  title: `${APP_NAME} | Systems that scale. Designs that convert.`,
  meta: [
    { name: 'description', content: description },
    { property: 'og:title', content: `${APP_NAME} | Systems that scale. Designs that convert.` },
    { property: 'og:description', content: description },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: siteUrl || undefined },
    { property: 'og:image', content: siteUrl ? `${siteUrl}/og-default.png` : undefined },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: `${APP_NAME}` },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: siteUrl ? `${siteUrl}/og-default.png` : undefined },
  ],
  link: siteUrl ? [{ rel: 'canonical', href: `${siteUrl}/` }] : [],
  script: [
    {
      type: 'application/ld+json',
      // Stringified — vite-ssg embeds this verbatim inside <script type=…>.
      innerHTML: JSON.stringify(organizationLd),
    },
  ],
})
</script>

<template>
  <!-- Each section owns its own vertical rhythm via .section-y, so we don't
       stack additional spacers here. -->
  <div>
    <HeroSection />
    <CapabilitiesSection :services="SERVICES" />
    <BenefitsSection :benefits="BENEFITS" />
    <StatsSection :stats="STATS" />
    <FaqSection v-if="SHOW_FAQ" :items="FAQ_ITEMS" />
    <CtaSection />
  </div>
</template>
