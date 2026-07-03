<script setup lang="ts">
import { useHead } from '@unhead/vue'
import SiteContainer from '@/components/SiteContainer.vue'
import AuroraBackdrop from '@/components/visuals/AuroraBackdrop.vue'
import { APP_NAME } from '@/constants'

useHead({
  title: `Page not found | ${APP_NAME}`,
  meta: [
    { name: 'robots', content: 'noindex, follow' },
    { name: 'description', content: 'The requested page does not exist or has been moved.' },
  ],
})
</script>

<template>
  <section class="section-y route-fade relative overflow-hidden">
    <AuroraBackdrop variant="soft" />
    <SiteContainer class="relative z-10">
      <div class="space-y-6 text-center">
        <p class="section-tag">Error 404</p>
        <h1 class="section-title">
          Lost in the
          <span class="gradient-text">grid.</span>
        </h1>
        <div class="accent-line mx-auto" />
        <p class="section-description mx-auto max-w-md">
          The page you requested does not exist, or it has moved. Head back home or send us a note.
        </p>
        <div class="flex flex-wrap items-center justify-center gap-3 pt-2">
          <RouterLink to="/" class="btn-primary-pill">Return Home</RouterLink>
          <RouterLink to="/get-started" class="btn-outline-pill">Contact Us</RouterLink>
        </div>
      </div>
    </SiteContainer>
  </section>
</template>
