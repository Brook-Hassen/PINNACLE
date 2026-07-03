<script setup lang="ts">
import type { Component } from 'vue'
import { computed, defineComponent, h, onBeforeUnmount, onMounted, ref } from 'vue'
import { Instagram, Linkedin, Mail, MapPin, Twitter } from 'lucide-vue-next'

import SiteContainer from '@/components/SiteContainer.vue'
import logoMark from '@/assets/brand/pinnacle_logomark.svg'
import { navTargetFor } from '@/lib'
import { APP_NAME, COMPANY_CONTACT, COMPANY_SOCIALS, NAV_LINKS, SERVICES, servicePath } from '@/constants'

const year = computed(() => new Date().getFullYear())

const exploreLinks = NAV_LINKS

const servicesLinks = SERVICES.map((service) => ({
  id: service.id,
  label: service.title,
  to: servicePath(service.id),
}))

const contactItems = [
  {
    id: 'email',
    label: COMPANY_CONTACT.email,
    href: `mailto:${COMPANY_CONTACT.email}`,
    icon: Mail,
  },
  { id: 'location', label: COMPANY_CONTACT.location, href: null, icon: MapPin },
] as const

const TikTok = defineComponent({
  render() {
    return h(
      'svg',
      {
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 24 24',
        fill: 'currentColor',
        class: 'h-4 w-4',
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

const footerRef = ref<HTMLElement | null>(null)
const brandShift = ref(0)
let motionQuery: MediaQueryList | null = null

const onScroll = (): void => {
  if (motionQuery?.matches) {
    brandShift.value = 0
    return
  }
  const el = footerRef.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  const vh = window.innerHeight
  if (rect.top >= vh) return
  const progress = Math.min(1, Math.max(0, (vh - rect.top) / (vh * 0.85)))
  brandShift.value = progress * 28
}

onMounted(() => {
  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  motionQuery.addEventListener('change', onScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  motionQuery?.removeEventListener('change', onScroll)
})
</script>

<template>
  <footer ref="footerRef" class="site-footer relative mt-24 overflow-hidden">
    <div class="site-footer__top-glow pointer-events-none absolute -top-px left-0 right-0 z-20 h-px" aria-hidden="true" />
    <div class="site-footer__top-radial pointer-events-none absolute inset-x-0 top-0 z-20 h-48" aria-hidden="true" />

    <div class="site-footer__surface relative overflow-hidden bg-[var(--bg-deep)] pt-16 sm:pt-20 lg:pt-24">
      <!-- Giant watermark — inside surface so it layers above the bg but behind content -->
      <div
        class="site-footer__watermark pointer-events-none select-none"
        :style="{ '--footer-brand-shift': `${brandShift}px` }"
        aria-hidden="true"
      >
        <div class="site-footer__watermark-atmosphere" />
        <div class="site-footer__watermark-ghost" aria-hidden="true">PINNACLE</div>
        <p class="site-footer__watermark-text">PINNACLE</p>
        <div class="site-footer__watermark-fade" />
      </div>

      <SiteContainer class="relative z-[1]">
        <div class="site-footer__content-divider" aria-hidden="true" />

        <div class="site-footer__grid grid gap-10 pt-14 sm:gap-16 sm:pt-16 lg:grid-cols-[1.45fr_1fr_1fr_1.12fr] lg:gap-12 lg:pt-20 lg:pb-20">
          <!-- Brand column -->
          <div class="site-footer__brand">
            <RouterLink
              to="/"
              aria-label="Go to home"
              class="site-footer__brand-link group inline-flex items-center gap-3"
            >
              <span class="site-footer__logo-mark">
                <img :src="logoMark" alt="" class="h-7 w-7" width="28" height="28" />
              </span>
              <p class="text-2xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-[var(--accent-soft-hex)] sm:text-[1.75rem]">
                {{ APP_NAME }}
              </p>
            </RouterLink>
            <p class="site-footer__tagline mt-4">
              Senior creatives. On tap.
            </p>
            <p class="mt-5 max-w-[22rem] text-[0.9375rem] leading-[1.65] text-muted-foreground">
              Development, design, and consulting under one roof. Less coordination on your end,
              more work getting out the door.
            </p>

            <div class="mt-9 flex items-center gap-2.5">
              <component
                v-for="social in socials"
                :key="social.id"
                :is="social.href ? 'a' : 'span'"
                :href="social.href ?? undefined"
                :target="social.href ? '_blank' : undefined"
                :rel="social.href ? 'noopener noreferrer' : undefined"
                :aria-label="social.href ? social.label : `${social.label} (link coming soon)`"
                :aria-disabled="social.href ? undefined : 'true'"
                :tabindex="social.href ? undefined : -1"
                class="site-footer__social"
                :class="{ 'site-footer__social--disabled': !social.href }"
              >
                <component :is="social.icon" class="h-4 w-4" />
              </component>
            </div>
          </div>

          <!-- Explore column -->
          <div>
            <p class="site-footer__col-title">Explore</p>
            <ul class="site-footer__links">
              <li v-for="link in exploreLinks" :key="link.id">
                <RouterLink :to="navTargetFor(link)" class="site-footer__link group">
                  <span>{{ link.id === 'work' ? 'Works' : link.label }}</span>
                  <span class="site-footer__link-arrow" aria-hidden="true">→</span>
                </RouterLink>
              </li>
            </ul>
          </div>

          <!-- Services column -->
          <div>
            <p class="site-footer__col-title">Services</p>
            <ul class="site-footer__links">
              <li v-for="svc in servicesLinks" :key="svc.id">
                <RouterLink :to="svc.to" class="site-footer__link group">
                  <span>{{ svc.label }}</span>
                  <span class="site-footer__link-arrow" aria-hidden="true">→</span>
                </RouterLink>
              </li>
            </ul>
          </div>

          <!-- Contact column -->
          <div>
            <p class="site-footer__col-title">Reach us</p>
            <ul class="site-footer__contact-list">
              <li
                v-for="item in contactItems"
                :key="item.id"
                class="site-footer__contact-item"
              >
                <span class="site-footer__contact-icon" aria-hidden="true">
                  <component :is="item.icon" class="h-4 w-4" />
                </span>
                <a
                  v-if="item.href"
                  :href="item.href"
                  class="site-footer__contact-link"
                >
                  {{ item.label }}
                </a>
                <span v-else class="site-footer__contact-label">{{ item.label }}</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Bottom bar -->
        <div class="site-footer__bar">
          <div class="site-footer__bar-inner">
            <p class="site-footer__copyright">
              © 2020 – {{ year }} {{ APP_NAME }}. All rights reserved.
            </p>
            <p class="site-footer__legal">
              <span class="site-footer__crafted">Crafted with intent.</span>
            </p>
          </div>
        </div>
      </SiteContainer>
    </div>
  </footer>
</template>

<style scoped>
.site-footer__surface {
  isolation: isolate;
}

.site-footer__top-glow {
  background: linear-gradient(90deg, transparent, rgba(43, 191, 184, 0.45), transparent);
}

.site-footer__top-radial {
  background: radial-gradient(
    ellipse 65% 100% at 50% 0%,
    rgba(17, 100, 102, 0.2) 0%,
    transparent 72%
  );
}

/* ── Giant background watermark ─────────────────────────────────── */
.site-footer__watermark {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}

.site-footer__watermark-atmosphere {
  position: absolute;
  left: 50%;
  bottom: -18%;
  width: min(130vw, 1500px);
  height: min(75vh, 560px);
  transform: translateX(-50%);
  background: radial-gradient(
    ellipse 55% 58% at 50% 62%,
    rgba(17, 100, 102, 0.28) 0%,
    rgba(43, 191, 184, 0.1) 38%,
    transparent 72%
  );
  animation: footer-atmosphere 11s ease-in-out infinite alternate;
}

.site-footer__watermark-ghost {
  position: absolute;
  left: 50%;
  bottom: 0;
  font-size: clamp(6rem, 23vw, 16.5rem);
  font-weight: 700;
  line-height: 0.88;
  letter-spacing: 0.2em;
  white-space: nowrap;
  color: rgba(43, 191, 184, 0.04);
  filter: blur(28px);
  transform: translate3d(-50%, calc(32% + var(--footer-brand-shift, 0px)), 0);
}

.site-footer__watermark-text {
  position: absolute;
  left: 50%;
  bottom: 0;
  margin: 0;
  font-size: clamp(6rem, 23vw, 16.5rem);
  font-weight: 700;
  line-height: 0.88;
  letter-spacing: 0.2em;
  white-space: nowrap;
  transform: translate3d(-50%, calc(32% + var(--footer-brand-shift, 0px)), 0);
  animation: footer-brand-glow 10s ease-in-out infinite alternate;
  background: linear-gradient(
    165deg,
    rgba(88, 224, 210, 0.11) 0%,
    rgba(236, 242, 239, 0.07) 42%,
    rgba(17, 100, 102, 0.05) 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
}

.site-footer__watermark-fade {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    var(--bg-deep) 0%,
    rgba(4, 8, 10, 0.88) 28%,
    rgba(4, 8, 10, 0.35) 58%,
    transparent 82%
  );
}

@keyframes footer-atmosphere {
  0% {
    opacity: 0.75;
    transform: translateX(-50%) scale(0.98);
  }
  100% {
    opacity: 1;
    transform: translateX(-50%) scale(1.04);
  }
}

@keyframes footer-brand-glow {
  0% {
    filter: drop-shadow(0 0 32px rgba(43, 191, 184, 0.08));
    opacity: 0.88;
  }
  100% {
    filter: drop-shadow(0 0 64px rgba(88, 224, 210, 0.14));
    opacity: 1;
  }
}

/* ── Brand column ──────────────────────────────────────────────── */
.site-footer__logo-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 1rem;
  border: 1px solid rgba(43, 191, 184, 0.32);
  background: rgba(17, 100, 102, 0.14);
  box-shadow: 0 0 24px rgba(17, 100, 102, 0.22);
  transition:
    border-color 0.3s var(--ease-out-premium),
    box-shadow 0.3s var(--ease-out-premium),
    transform 0.3s var(--ease-out-premium);
}

.site-footer__brand-link:hover .site-footer__logo-mark {
  border-color: rgba(88, 224, 210, 0.45);
  box-shadow: 0 0 32px rgba(43, 191, 184, 0.28);
  transform: translateY(-1px);
}

.site-footer__tagline {
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--accent-soft-hex);
}

.site-footer__social {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 0.75rem;
  border: 1px solid var(--border-soft);
  background: rgba(19, 27, 26, 0.55);
  color: rgba(236, 242, 239, 0.78);
  backdrop-filter: blur(8px);
  transition:
    transform 0.28s var(--ease-out-premium),
    border-color 0.28s var(--ease-out-premium),
    background-color 0.28s var(--ease-out-premium),
    color 0.28s var(--ease-out-premium),
    box-shadow 0.28s var(--ease-out-premium);
}

.site-footer__social:not(.site-footer__social--disabled):hover {
  transform: translateY(-2px);
  border-color: rgba(43, 191, 184, 0.4);
  background: rgba(17, 100, 102, 0.2);
  color: var(--accent-glow-hex);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.site-footer__social--disabled {
  opacity: 0.38;
  cursor: not-allowed;
}

/* ── Link columns ──────────────────────────────────────────────── */
.site-footer__col-title {
  margin-bottom: 1.35rem;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--text-subtle-hex);
}

.site-footer__links {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.site-footer__link {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  width: fit-content;
  font-size: 0.9375rem;
  font-weight: 500;
  letter-spacing: 0.01em;
  color: rgba(236, 242, 239, 0.82);
  text-decoration: none;
  transition:
    color 0.25s var(--ease-out-premium),
    transform 0.25s var(--ease-out-premium);
}

.site-footer__link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -3px;
  width: 0;
  height: 1px;
  background: linear-gradient(90deg, var(--accent-soft-hex), transparent);
  transition: width 0.32s var(--ease-out-premium);
}

.site-footer__link:hover {
  color: var(--accent-soft-hex);
  transform: translateX(3px);
}

.site-footer__link:hover::after {
  width: calc(100% - 1.25rem);
}

.site-footer__link-arrow {
  font-size: 0.8rem;
  color: var(--accent-soft-hex);
  opacity: 0;
  transform: translateX(-4px);
  transition:
    opacity 0.25s var(--ease-out-premium),
    transform 0.25s var(--ease-out-premium);
}

.site-footer__link:hover .site-footer__link-arrow {
  opacity: 0.85;
  transform: translateX(0);
}

/* ── Contact column ────────────────────────────────────────────── */
.site-footer__contact-list {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.site-footer__contact-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.site-footer__contact-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 2rem;
  height: 2rem;
  margin-top: 0.1rem;
  border-radius: 0.625rem;
  border: 1px solid var(--border-soft);
  background: rgba(19, 27, 26, 0.5);
  color: var(--accent-soft-hex);
  transition:
    border-color 0.25s var(--ease-out-premium),
    background-color 0.25s var(--ease-out-premium);
}

.site-footer__contact-item:hover .site-footer__contact-icon {
  border-color: rgba(43, 191, 184, 0.35);
  background: rgba(17, 100, 102, 0.16);
}

.site-footer__contact-link,
.site-footer__contact-label {
  font-size: 0.9375rem;
  line-height: 1.5;
  color: rgba(236, 242, 239, 0.84);
  word-break: break-word;
}

.site-footer__contact-link {
  position: relative;
  text-decoration: none;
  transition: color 0.25s var(--ease-out-premium);
}

.site-footer__contact-link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 0;
  height: 1px;
  background: var(--accent-soft-hex);
  transition: width 0.3s var(--ease-out-premium);
}

.site-footer__contact-link:hover {
  color: var(--accent-glow-hex);
}

.site-footer__contact-link:hover::after {
  width: 100%;
}

/* ── Top content divider ───────────────────────────────────────── */
.site-footer__content-divider {
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(43, 191, 184, 0.08) 15%,
    rgba(43, 191, 184, 0.38) 50%,
    rgba(43, 191, 184, 0.08) 85%,
    transparent 100%
  );
}

/* ── Bottom bar ────────────────────────────────────────────────── */
.site-footer__bar {
  margin-top: 0.5rem;
  padding-bottom: 1.75rem;
}

.site-footer__bar-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 0.85rem;
}

@media (min-width: 640px) {
  .site-footer__bar-inner {
    flex-direction: row;
    gap: 1rem;
  }
}

.site-footer__copyright {
  font-size: 0.8125rem;
  letter-spacing: 0.02em;
  color: var(--text-muted-hex);
}

.site-footer__legal {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  font-size: 0.8125rem;
  color: var(--text-muted-hex);
}

.site-footer__legal-link {
  position: relative;
  color: rgba(236, 242, 239, 0.72);
  text-decoration: none;
  transition: color 0.22s var(--ease-out-premium);
}

.site-footer__legal-link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -1px;
  width: 0;
  height: 1px;
  background: var(--accent-soft-hex);
  transition: width 0.28s var(--ease-out-premium);
}

.site-footer__legal-link:hover {
  color: var(--accent-soft-hex);
}

.site-footer__legal-link:hover::after {
  width: 100%;
}

.site-footer__legal-dot {
  color: rgba(236, 242, 239, 0.18);
}

.site-footer__crafted {
  color: rgba(236, 242, 239, 0.48);
  letter-spacing: 0.03em;
}

@media (prefers-reduced-motion: reduce) {
  .site-footer__watermark-text,
  .site-footer__watermark-ghost {
    animation: none;
    transform: translate3d(-50%, 32%, 0);
  }

  .site-footer__watermark-atmosphere {
    animation: none;
  }

  .site-footer__link:hover,
  .site-footer__social:not(.site-footer__social--disabled):hover {
    transform: none;
  }
}
</style>
