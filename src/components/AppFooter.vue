<script setup lang="ts">
import type { Component } from 'vue'
import { computed, defineComponent, h } from 'vue'
import { Instagram, Linkedin, Mail, MapPin, Twitter } from 'lucide-vue-next'

import logoMark from '@/assets/brand/pinnacle_logomark.svg'
import { APP_NAME, COMPANY_CONTACT, COMPANY_SOCIALS } from '@/constants'

const year = computed(() => new Date().getFullYear())

const TikTok = defineComponent({
  render() {
    return h(
      'svg',
      {
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 24 24',
        fill: 'currentColor',
        class: 'h-3.5 w-3.5',
        'aria-hidden': 'true',
      },
      [
        h('path', {
          d: 'M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z',
        }),
      ],
    )
  },
})

const SOCIAL_ICONS: Record<string, Component> = {
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
  tiktok: TikTok,
}

const socials = computed(() =>
  COMPANY_SOCIALS.map((social) => ({
    ...social,
    icon: SOCIAL_ICONS[social.id] ?? Mail,
  })),
)
</script>

<template>
  <!-- Dream-style atmospheric single bar — brand, chips, © -->
  <footer class="site-footer relative mt-16 overflow-hidden sm:mt-20">
    <div
      class="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(16,26,24,0.35)] to-[rgba(16,26,24,0.7)]"
      aria-hidden="true"
    />
    <div
      class="section-grid-bg pointer-events-none absolute inset-0 opacity-25 [mask-image:linear-gradient(to_top,black,transparent_70%)]"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute inset-x-5 top-0 mx-auto h-px max-w-7xl bg-gradient-to-r from-transparent via-[rgba(43,191,184,0.35)] to-transparent md:inset-x-10"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute left-1/2 top-0 h-24 w-[680px] max-w-[85%] -translate-x-1/2 rounded-full bg-[rgba(17,100,102,0.08)] blur-[72px]"
      aria-hidden="true"
    />

    <!-- Mobile -->
    <div class="relative mx-auto max-w-7xl px-5 pb-6 pt-8 md:hidden">
      <RouterLink to="/" aria-label="Go to home" class="inline-flex items-center gap-2.5 transition-opacity hover:opacity-85">
        <img :src="logoMark" alt="" class="h-6 w-6" width="24" height="24" />
        <span class="font-display text-sm font-bold tracking-tight text-foreground">{{ APP_NAME }}</span>
      </RouterLink>

      <div class="mt-6 flex items-center justify-between gap-3">
        <div class="flex items-center gap-1.5">
          <a
            :href="`mailto:${COMPANY_CONTACT.email}`"
            class="site-footer__chip"
            :aria-label="COMPANY_CONTACT.email"
            :title="COMPANY_CONTACT.email"
          >
            <Mail class="h-3.5 w-3.5" />
          </a>
          <span
            class="site-footer__chip"
            :title="COMPANY_CONTACT.location"
            :aria-label="COMPANY_CONTACT.location"
          >
            <MapPin class="h-3.5 w-3.5" />
          </span>
          <span class="mx-0.5 h-3 w-px bg-foreground/10" aria-hidden="true" />
          <component
            :is="social.href ? 'a' : 'span'"
            v-for="social in socials"
            :key="social.id"
            :href="social.href ?? undefined"
            :target="social.href ? '_blank' : undefined"
            :rel="social.href ? 'noopener noreferrer' : undefined"
            :aria-label="social.href ? social.label : `${social.label} (link coming soon)`"
            :aria-disabled="social.href ? undefined : 'true'"
            :tabindex="social.href ? undefined : -1"
            class="site-footer__chip"
            :class="{ 'site-footer__chip--disabled': !social.href }"
          >
            <component :is="social.icon" class="h-3.5 w-3.5" />
          </component>
        </div>
        <p class="font-mono text-[8px] uppercase tracking-[0.12em] text-foreground/30 whitespace-nowrap">
          © {{ year }} {{ APP_NAME }}
        </p>
      </div>
    </div>

    <!-- Desktop: single horizontal bar -->
    <div class="relative mx-auto hidden max-w-7xl items-center justify-between gap-6 px-10 py-6 md:flex">
      <RouterLink
        to="/"
        aria-label="Go to home"
        class="inline-flex shrink-0 items-center gap-2.5 transition-opacity hover:opacity-85"
      >
        <img :src="logoMark" alt="" class="h-6 w-6" width="24" height="24" />
        <span class="font-display text-sm font-bold tracking-tight text-foreground">{{ APP_NAME }}</span>
      </RouterLink>

      <div class="flex shrink-0 items-center gap-4">
        <div class="flex items-center gap-2">
          <a
            :href="`mailto:${COMPANY_CONTACT.email}`"
            class="site-footer__chip"
            :aria-label="COMPANY_CONTACT.email"
            :title="COMPANY_CONTACT.email"
          >
            <Mail class="h-3.5 w-3.5" />
          </a>
          <span
            class="site-footer__chip"
            :title="COMPANY_CONTACT.location"
            :aria-label="COMPANY_CONTACT.location"
          >
            <MapPin class="h-3.5 w-3.5" />
          </span>
          <span class="mx-0.5 h-3 w-px shrink-0 bg-foreground/10" aria-hidden="true" />
          <component
            :is="social.href ? 'a' : 'span'"
            v-for="social in socials"
            :key="social.id"
            :href="social.href ?? undefined"
            :target="social.href ? '_blank' : undefined"
            :rel="social.href ? 'noopener noreferrer' : undefined"
            :aria-label="social.href ? social.label : `${social.label} (link coming soon)`"
            :aria-disabled="social.href ? undefined : 'true'"
            :tabindex="social.href ? undefined : -1"
            class="site-footer__chip"
            :class="{ 'site-footer__chip--disabled': !social.href }"
          >
            <component :is="social.icon" class="h-3.5 w-3.5" />
          </component>
        </div>
        <span class="h-3 w-px shrink-0 bg-foreground/10" aria-hidden="true" />
        <p class="font-mono text-[9px] uppercase tracking-[0.12em] text-foreground/30 whitespace-nowrap">
          © {{ year }} {{ APP_NAME }}
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer__chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 0.375rem;
  border: 1px solid var(--border-soft);
  background: rgba(16, 26, 24, 0.7);
  color: rgba(232, 240, 237, 0.45);
  transition:
    color 200ms ease,
    border-color 200ms ease,
    background-color 200ms ease;
}

@media (min-width: 768px) {
  .site-footer__chip {
    width: 2rem;
    height: 2rem;
  }
}

.site-footer__chip:hover {
  border-color: rgba(43, 191, 184, 0.4);
  background: rgba(17, 100, 102, 0.1);
  color: var(--accent-soft-hex);
}

.site-footer__chip--disabled {
  opacity: 0.35;
  cursor: not-allowed;
  pointer-events: none;
}
</style>
