<script setup lang="ts">
import { computed, ref, type Component } from 'vue'
import {
  Briefcase,
  Clapperboard,
  Megaphone,
  MonitorSmartphone,
  Sparkles,
  SwatchBook,
} from 'lucide-vue-next'
import SiteContainer from '@/components/SiteContainer.vue'
import { servicePath } from '@/constants/servicePages'
import type { ServiceItem } from '@/types'

interface Props {
  services: readonly ServiceItem[]
}

const props = defineProps<Props>()

const marqueePaused = ref(false)

const favicon = (domain: string, size = 256) =>
  `https://www.google.com/s2/favicons?sz=${size}&domain=${domain}`

const partnerBrands = [
  {
    name: 'JASIRI',
    logoSrc: 'https://jasiri.org/wp-content/uploads/2023/08/cropped-Jasiri-favicon-192x192.png',
    logoFallback: favicon('jasiri.org'),
    logoAlt: 'Jasiri logo',
    round: false,
  },
  {
    name: 'Eaglepoint',
    logoSrc: 'https://www.eaglepoint.ai/favicon.jpg',
    logoFallback: favicon('eaglepoint.ai'),
    logoAlt: 'Eaglepoint logo',
    round: false,
  },
  {
    name: 'Ola',
    logoSrc: 'https://assets.olacabs.com/ola-prod-website/ola-white-logo.svg',
    logoFallback: favicon('olacabs.com'),
    logoAlt: 'Ola logo',
    round: false,
  },
  {
    name: 'SOLAR 23',
    logoSrc:
      'https://static.wixstatic.com/media/f01157_5544720e2b844eeda0cfe5db0b4f8012~mv2.png/v1/fill/w_293,h_77,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/SOLAR23-LOGO_red_2015.png',
    logoFallback: favicon('solar23.com'),
    logoAlt: 'Solar 23 logo',
    round: false,
  },
  {
    name: 'RIDE',
    logoSrc: 'https://ride8294.com/wp-content/uploads/2023/12/ride@2x.png',
    logoFallback: favicon('ride8294.com'),
    logoAlt: 'RIDE logo',
    round: false,
  },
  {
    name: 'Swiggy',
    logoSrc: 'https://www.swiggy.com/corporate/wp-content/uploads/2024/11/Swiggy-Logo-1.png',
    logoFallback: favicon('swiggy.com'),
    logoAlt: 'Swiggy logo',
    round: false,
  },
  {
    name: 'beU delivery',
    logoSrc: 'https://beudelivery.com/imgs/beu-logo.png',
    logoFallback: favicon('beudelivery.com'),
    logoAlt: 'beU delivery logo',
    round: false,
  },
] as const

const handleLogoError = (event: Event, fallback: string) => {
  const img = event.currentTarget as HTMLImageElement
  if (img.src === fallback) return
  img.src = fallback
}

const serviceIconMap: Record<ServiceItem['id'], Component> = {
  'video-photo-editing': Clapperboard,
  'graphics-design': SwatchBook,
  'web-apps-systems': MonitorSmartphone,
  'business-consultation': Briefcase,
  'social-media-management': Megaphone,
}

const withIcon = (service: ServiceItem) => ({
  ...service,
  icon: serviceIconMap[service.id] ?? Sparkles,
})

/** Future Quest offer-grid roles — feature + side + three smalls. */
const offerLayout = computed(() => {
  const byId = Object.fromEntries(props.services.map((s) => [s.id, withIcon(s)])) as Record<
    ServiceItem['id'],
    ReturnType<typeof withIcon>
  >

  const feature = byId['web-apps-systems']
  const side = byId['business-consultation']
  const smallIds = [
    'video-photo-editing',
    'graphics-design',
    'social-media-management',
  ] as const
  const smalls = smallIds.map((id) => byId[id]).filter((s): s is NonNullable<typeof s> => Boolean(s))

  return { feature, side, smalls }
})

const sideTags = ['Strategy', 'Roadmaps', 'Launch', 'Advisory'] as const
</script>

<template>
  <section id="services" class="relative pb-[var(--section-pad-y)] sm:pb-[var(--section-pad-y-md)]">
    <div
      class="logo-marquee w-full py-8 sm:py-10"
      aria-label="Partner brands"
      @pointerenter="marqueePaused = true"
      @pointerleave="marqueePaused = false"
    >
      <SiteContainer>
        <p class="section-tag mb-8 block sm:mb-12">Trusted by</p>
      </SiteContainer>
      <div class="logo-marquee__viewport">
        <div class="logo-marquee__track" :class="{ 'logo-marquee__track--paused': marqueePaused }">
          <div
            v-for="groupIndex in 3"
            :key="groupIndex"
            class="logo-marquee__group"
            :aria-hidden="groupIndex > 1 ? true : undefined"
          >
            <article
              v-for="brand in partnerBrands"
              :key="`${groupIndex}-${brand.name}`"
              class="logo-marquee__item"
              tabindex="0"
            >
              <img
                :src="brand.logoSrc"
                :alt="groupIndex === 1 ? brand.logoAlt : ''"
                class="logo-marquee__image"
                :class="{ 'logo-marquee__image--round': brand.round }"
                loading="lazy"
                decoding="async"
                draggable="false"
                referrerpolicy="no-referrer"
                @error="handleLogoError($event, brand.logoFallback)"
              />
              <p class="logo-marquee__name">{{ brand.name }}</p>
            </article>
          </div>
        </div>
      </div>
    </div>

    <div class="offer-showcase">
      <SiteContainer>
        <div v-reveal="{ blur: true }" class="offer-showcase__header">
          <div>
            <p class="offer-showcase__eyebrow">
              <span />
              What we build
            </p>
            <h2 class="offer-showcase__title">
              Everything you need,
              <br />
              under <em>one roof.</em>
            </h2>
          </div>
        </div>

        <div class="offer-grid">
          <RouterLink
            v-if="offerLayout.feature"
            v-reveal
            :to="servicePath(offerLayout.feature.id)"
            class="offer-card offer-card--feature group no-underline"
          >
            <div class="offer-icon">
              <component :is="offerLayout.feature.icon" class="h-5 w-5" aria-hidden="true" />
            </div>
            <p class="offer-kicker">// Flagship</p>
            <h3>
              Web, Apps
              <span>&amp; Systems</span>
            </h3>
            <p class="offer-card__copy">{{ offerLayout.feature.description }}</p>
            <div class="offer-feature__bottom">
              <span class="offer-primary-link">
                See More
                <span aria-hidden="true" class="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </span>
            </div>
          </RouterLink>

          <RouterLink
            v-if="offerLayout.side"
            v-reveal="{ delay: 90 }"
            :to="servicePath(offerLayout.side.id)"
            class="offer-card offer-card--side group no-underline"
          >
            <div class="offer-icon">
              <component :is="offerLayout.side.icon" class="h-5 w-5" aria-hidden="true" />
            </div>
            <h3>{{ offerLayout.side.title }}</h3>
            <p class="offer-card__copy">{{ offerLayout.side.description }}</p>
            <div class="offer-divider" />
            <p class="offer-kicker">// Focus</p>
            <div class="offer-tags">
              <span
                v-for="(tag, index) in sideTags"
                :key="tag"
                :class="{ 'is-active': index === 0 }"
              >
                {{ tag }}
              </span>
            </div>
            <div class="offer-card__footer">
              <span class="arrow-link">
                Explore
                <span aria-hidden="true" class="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </span>
            </div>
          </RouterLink>

          <RouterLink
            v-for="(service, i) in offerLayout.smalls"
            :key="service.id"
            v-reveal="{ delay: 140 + i * 60 }"
            :to="servicePath(service.id)"
            class="offer-card offer-card--small group no-underline"
          >
            <div class="offer-icon">
              <component :is="service.icon" class="h-5 w-5" aria-hidden="true" />
            </div>
            <h3>{{ service.title }}</h3>
            <p class="offer-card__copy">{{ service.description }}</p>
            <div class="offer-card__footer">
              <span class="arrow-link">
                See More
                <span aria-hidden="true" class="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </span>
            </div>
          </RouterLink>
        </div>
      </SiteContainer>
    </div>
  </section>
</template>

<style scoped>
.logo-marquee__viewport {
  width: 100%;
  overflow: hidden;
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 10%,
    black 90%,
    transparent 100%
  );
  mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 10%,
    black 90%,
    transparent 100%
  );
}

.logo-marquee__track {
  display: flex;
  width: max-content;
  animation: partner-glide 42s linear infinite;
  will-change: transform;
}

.logo-marquee__track--paused,
.logo-marquee__viewport:hover .logo-marquee__track,
.logo-marquee__track:has(.logo-marquee__item:hover),
.logo-marquee__track:has(.logo-marquee__item:focus-visible) {
  animation-play-state: paused;
}

.logo-marquee__group {
  display: flex;
  flex-shrink: 0;
  align-items: flex-start;
  gap: 3rem;
  padding-inline: 1.5rem;
}

@media (min-width: 640px) {
  .logo-marquee__group {
    gap: 4rem;
    padding-inline: 2rem;
  }
}

.logo-marquee__item {
  display: flex;
  width: 7.5rem;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 0.75rem;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
  cursor: default;
  outline: none;
}

.logo-marquee__image {
  height: 2.5rem;
  width: auto;
  max-width: 6.5rem;
  object-fit: contain;
  object-position: center;
  filter: grayscale(1) brightness(1.35) contrast(0.9);
  opacity: 0.62;
  transition: filter 320ms ease, opacity 320ms ease, transform 320ms ease;
}

.logo-marquee__image--round {
  border-radius: 9999px;
}

.logo-marquee__name {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muted-foreground, rgba(236, 242, 239, 0.55));
  text-align: center;
  transition: color 320ms ease;
}

.logo-marquee__item:hover .logo-marquee__image,
.logo-marquee__item:focus-visible .logo-marquee__image {
  filter: none;
  opacity: 1;
  transform: translateY(-1px);
}

.logo-marquee__item:hover .logo-marquee__name,
.logo-marquee__item:focus-visible .logo-marquee__name {
  color: var(--foreground, rgba(236, 242, 239, 0.92));
}

@keyframes partner-glide {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-33.333%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .logo-marquee__viewport {
    -webkit-mask-image: none;
    mask-image: none;
  }

  .logo-marquee__track {
    animation: none;
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem 3rem;
  }

  .logo-marquee__group {
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem 3rem;
    padding-inline: 0;
  }

  .logo-marquee__group:not(:first-child) {
    display: none;
  }

  .logo-marquee__item:hover .logo-marquee__image,
  .logo-marquee__item:focus-visible .logo-marquee__image {
    transform: none;
  }
}
</style>
