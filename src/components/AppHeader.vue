<script setup lang="ts">
import logoMark from '@/assets/brand/pinnacle_logomark.svg'
import { Button } from '@/components/ui/button'
import { APP_NAME } from '@/constants'
import { NAV_LINKS } from '@/constants'
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur">
    <nav class="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between gap-4">
        <RouterLink to="/" aria-label="Go to home" class="flex items-center gap-2.5 font-semibold text-foreground">
          <img :src="logoMark" alt="PINNACLE AI logo" class="h-8 w-8" width="32" height="32" />
          <span class="text-2xl leading-none">{{ APP_NAME }}</span>
        </RouterLink>

        <ul class="hidden items-center gap-8 lg:flex">
          <li v-for="link in NAV_LINKS" :key="link.id">
            <RouterLink
              :to="link.to"
              class="text-lg font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {{ link.label }}
            </RouterLink>
          </li>
        </ul>

        <Button
          as-child
          class="cursor-pointer rounded-full border border-border bg-card px-5 text-base font-semibold text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/45 hover:bg-accent hover:shadow-[0_18px_40px_-24px_rgba(255,255,255,0.55)] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-0"
        >
          <RouterLink to="/get-started" class="inline-flex items-center justify-center">
            Get Started
          </RouterLink>
        </Button>
      </div>

      <ul class="mt-4 flex gap-4 overflow-x-auto pb-1 lg:hidden">
        <li v-for="link in NAV_LINKS" :key="`${link.id}-mobile`">
          <RouterLink
            :to="link.to"
            class="whitespace-nowrap text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {{ link.label }}
          </RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>
