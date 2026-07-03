<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import SiteContainer from '@/components/SiteContainer.vue'
import BorderBeam from '@/components/ui/BorderBeam.vue'

interface Props {
  headline: string
  description: string
  cycleKey: number
}

defineProps<Props>()
</script>

<template>
  <section class="section-y relative border-t border-border/40">
    <SiteContainer>
      <BorderBeam>
        <div class="relative overflow-hidden p-8 text-center md:p-16">
          <div class="noise rounded-[var(--radius-card-lg)]" aria-hidden="true" />
          <div
            class="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-soft-hex)] to-transparent opacity-70"
            aria-hidden="true"
          />
          <div class="relative z-10">
            <h2 v-reveal="{ blur: true, cycleKey }" class="section-title mx-auto max-w-3xl">{{ headline }}</h2>
            <p v-reveal="{ delay: 80, cycleKey }" class="section-description mx-auto mt-6 max-w-2xl">{{ description }}</p>
            <div v-reveal="{ delay: 140, cycleKey }" class="mt-10 flex flex-wrap items-center justify-center gap-3">
              <RouterLink to="/get-started" class="btn-primary-pill btn-lg group">
                Get Started
                <ArrowRight class="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </RouterLink>
            </div>
          </div>
        </div>
      </BorderBeam>
    </SiteContainer>
  </section>
</template>
