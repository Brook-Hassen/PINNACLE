<script setup lang="ts">
import { Linkedin, Mail, Phone, Twitter } from 'lucide-vue-next'

import logoMark from '@/assets/brand/pinnacle_logomark.svg'
import { APP_NAME } from '@/constants'
import { NAV_LINKS } from '@/constants'
</script>

<template>
  <footer class="bg-background">
    <div class="h-20 border-t border-border sm:h-24" />

    <div class="border-t border-border">
      <div class="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.7fr_0.35fr] lg:px-8">
        <div>
          <div class="flex items-center gap-3">
            <img :src="logoMark" alt="PINNACLE AI logo" class="h-10 w-10" width="40" height="40" />
            <p class="text-4xl font-semibold leading-none text-foreground sm:text-5xl">{{ APP_NAME }}</p>
          </div>
          <p class="mt-4 max-w-md text-xl leading-snug text-muted-foreground sm:text-2xl">
            Systems That Scale. Designs That Convert.
          </p>
          <RouterLink
            to="/get-started"
            class="mt-8 inline-flex rounded-full border border-border bg-card px-5 py-2.5 text-base font-semibold text-foreground hover:bg-accent"
          >
            Get Started ↗
          </RouterLink>
        </div>

        <div class="space-y-3">
          <RouterLink
            v-for="link in NAV_LINKS"
            :key="link.id"
            :to="link.to"
            class="block text-2xl leading-none text-foreground hover:text-muted-foreground sm:text-3xl"
          >
            {{ link.id === 'work' ? 'Works' : link.label }}
          </RouterLink>
        </div>

        <div class="space-y-4">
          <a href="#" class="block text-foreground transition-opacity hover:opacity-70"><Linkedin class="h-7 w-7" /></a>
          <a href="#" class="block text-foreground transition-opacity hover:opacity-70"><Twitter class="h-7 w-7" /></a>
          <a href="mailto:hello@pinnacleai.com" class="block text-foreground transition-opacity hover:opacity-70"><Mail class="h-7 w-7" /></a>
          <a href="tel:+10000000000" class="block text-foreground transition-opacity hover:opacity-70"><Phone class="h-7 w-7" /></a>
        </div>
      </div>
    </div>

    <div class="mx-auto w-full max-w-7xl border-t border-border px-4 py-6 text-center text-base text-muted-foreground sm:px-6 lg:px-8">
      Copyright © 2020 - 2026 PINNACLE AI. All rights reserved.
    </div>
  </footer>
</template>
