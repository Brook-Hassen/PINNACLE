<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppFooter from '@/components/AppFooter.vue'
import AppHeader from '@/components/AppHeader.vue'

const route = useRoute()
/** Home hero bleeds under the fixed nav; other routes need clearance. */
const mainClass = computed(() => (route.name === 'home' ? '' : 'pt-16'))
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <a
      href="#main-content"
      class="btn-primary-pill sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50"
    >
      Skip to content
    </a>
    <AppHeader />
    <main id="main-content" :class="mainClass">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
