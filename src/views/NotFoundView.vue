<script setup lang="ts">
import SiteContainer from '@/components/SiteContainer.vue'
import { Button } from '@/components/ui/button'
</script>

<template>
  <section class="py-20">
    <SiteContainer>
      <div class="space-y-4 text-center">
        <p class="text-sm font-semibold uppercase tracking-[0.2em] text-primary">404</p>
        <h1 class="text-3xl font-semibold tracking-tight">Page not found</h1>
        <p class="text-muted-foreground">The page you requested does not exist.</p>
        <RouterLink to="/">
          <Button>Return Home</Button>
        </RouterLink>
      </div>
    </SiteContainer>
  </section>
</template>
