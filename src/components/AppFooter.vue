<script setup lang="ts">
import { Linkedin, Mail, Phone, Twitter } from 'lucide-vue-next'

import SiteContainer from '@/components/SiteContainer.vue'
import logoMark from '@/assets/brand/pinnacle_logomark.svg'
import { APP_NAME } from '@/constants'
import { NAV_LINKS } from '@/constants'
</script>

<template>
  <footer class="border-t border-border bg-background">
    <SiteContainer>
      <div class="grid gap-10 py-12 md:grid-cols-[1.3fr_0.8fr_0.65fr] md:items-start md:gap-8">
        <div>
          <RouterLink to="/" aria-label="Go to home" class="inline-flex items-center gap-3">
            <img :src="logoMark" alt="PINNACLE AI logo" class="h-8 w-8" width="32" height="32" />
            <p class="text-2xl font-semibold leading-none text-foreground sm:text-3xl">{{ APP_NAME }}</p>
          </RouterLink>
          <p class="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
            Systems That Scale. Designs That Convert.
          </p>
          <RouterLink
            to="/get-started"
            class="mt-5 inline-flex rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-accent sm:text-base"
          >
            Get Started ↗
          </RouterLink>
        </div>

        <div>
          <p class="mb-3 text-xs font-semibold tracking-[0.12em] text-muted-foreground/90 uppercase">Navigate</p>
          <div class="grid grid-cols-2 gap-x-6 gap-y-2 md:grid-cols-1">
            <RouterLink
              v-for="link in NAV_LINKS"
              :key="link.id"
              :to="link.to"
              class="text-sm text-foreground/90 transition-colors hover:text-foreground sm:text-base"
            >
              {{ link.id === 'work' ? 'Works' : link.label }}
            </RouterLink>
          </div>
        </div>

        <div>
          <p class="mb-3 text-xs font-semibold tracking-[0.12em] text-muted-foreground/90 uppercase">Connect</p>
          <div class="flex items-center gap-3">
            <a
              href="#"
              aria-label="LinkedIn"
              class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-accent"
            >
              <Linkedin class="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-accent"
            >
              <Twitter class="h-4 w-4" />
            </a>
            <a
              href="mailto:hello@pinnacleai.com"
              aria-label="Email"
              class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-accent"
            >
              <Mail class="h-4 w-4" />
            </a>
            <a
              href="tel:+10000000000"
              aria-label="Phone"
              class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-accent"
            >
              <Phone class="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <div class="border-t border-border py-5 text-center text-xs text-muted-foreground sm:text-sm">
        Copyright © 2020 - 2026 PINNACLE AI. All rights reserved.
      </div>
    </SiteContainer>
  </footer>
</template>
