<script setup lang="ts">
import { ArrowLeft, ArrowRight } from 'lucide-vue-next'
import SiteContainer from '@/components/SiteContainer.vue'
import BadgePill from '@/components/ui/BadgePill.vue'
import { homeSectionTarget } from '@/lib/navigation'
import type { ServicePage } from '@/types'

interface Props {
  service: ServicePage
  cycleKey: number
}

defineProps<Props>()
</script>

<template>
  <section :key="cycleKey" class="service-hero section-y relative pt-28 sm:pt-32">
    <SiteContainer>
      <RouterLink
        :to="homeSectionTarget('services')"
        class="anim-fade-up inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
        style="animation-delay: 0s"
      >
        <ArrowLeft class="h-3.5 w-3.5" />
        All services
      </RouterLink>

      <div class="anim-fade-up mt-10 max-w-4xl space-y-6" style="animation-delay: 0.05s">
        <BadgePill :with-dot="false">{{ service.category }}</BadgePill>
        <h1 class="hero-display text-balance text-[length:var(--font-display)] font-semibold tracking-tight text-foreground">
          {{ service.headline }}
        </h1>
        <div class="accent-line" />
        <p class="text-lg leading-relaxed text-muted-foreground sm:text-xl">
          {{ service.description }}
        </p>
        <p class="max-w-3xl text-base leading-relaxed text-muted-foreground/90">
          {{ service.supportingCopy }}
        </p>
      </div>

      <div class="anim-fade-up mt-10" style="animation-delay: 0.15s">
        <RouterLink to="/get-started" class="btn-primary-pill btn-lg group">
          Get Started
          <ArrowRight class="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </RouterLink>
      </div>
    </SiteContainer>
  </section>
</template>
