<script setup lang="ts">
import { ArrowLeft, ArrowRight } from 'lucide-vue-next'
import SiteContainer from '@/components/SiteContainer.vue'
import type { ServicePage } from '@/types'
import { servicePath } from '@/constants/servicePages'

interface Props {
  previous: ServicePage | null
  next: ServicePage | null
}

defineProps<Props>()
</script>

<template>
  <nav
    v-if="previous || next"
    class="border-t border-border/40 py-10"
    aria-label="Other services"
  >
    <SiteContainer>
      <div class="grid gap-4 sm:grid-cols-2">
        <RouterLink
          v-if="previous"
          :to="servicePath(previous.slug)"
          class="service-nav-link group rounded-[var(--radius-card)] border border-border/50 bg-card/20 p-5 transition-colors hover:border-[rgba(43,191,184,0.35)] hover:bg-card/40"
        >
          <span class="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            <ArrowLeft class="size-3.5 transition-transform group-hover:-translate-x-0.5" />
            Previous
          </span>
          <p class="mt-2 text-lg font-semibold text-foreground">{{ previous.title }}</p>
        </RouterLink>
        <div v-else class="hidden sm:block" />

        <RouterLink
          v-if="next"
          :to="servicePath(next.slug)"
          class="service-nav-link group rounded-[var(--radius-card)] border border-border/50 bg-card/20 p-5 text-right transition-colors hover:border-[rgba(43,191,184,0.35)] hover:bg-card/40 sm:col-start-2"
        >
          <span class="inline-flex items-center justify-end gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Next
            <ArrowRight class="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
          <p class="mt-2 text-lg font-semibold text-foreground">{{ next.title }}</p>
        </RouterLink>
      </div>
    </SiteContainer>
  </nav>
</template>
