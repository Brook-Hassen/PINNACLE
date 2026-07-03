<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import SiteContainer from '@/components/SiteContainer.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import BorderBeam from '@/components/ui/BorderBeam.vue'
</script>

<template>
  <section class="section-y relative">
    <SiteContainer>
      <BorderBeam>
        <div class="relative overflow-hidden p-8 text-center md:p-16">
          <div class="section-grid-bg pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
          <div
            class="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-soft-hex)] to-transparent opacity-70"
            aria-hidden="true"
          />
          <div
            class="pointer-events-none absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-soft-hex)] to-transparent opacity-30"
            aria-hidden="true"
          />
          <div class="noise rounded-[var(--radius-card-lg)]" aria-hidden="true" />

          <div class="relative z-10">
            <SectionHeading
              centered
              tag="Ready to scale?"
              title="Stop assembling vendors."
              highlight=" Start shipping."
              description="Send one brief. Design, engineering, and strategy pull in the same direction, with delivery cycles measured in days, not quarters."
            />

            <div v-reveal="{ delay: 140 }" class="mt-12 flex flex-wrap items-center justify-center gap-3">
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
