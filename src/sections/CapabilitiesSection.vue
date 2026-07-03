<script setup lang="ts">
import { computed, ref, type Component } from 'vue'
import {
  ArrowRight,
  Briefcase,
  Clapperboard,
  Megaphone,
  MonitorSmartphone,
  Sparkles,
  SwatchBook,
} from 'lucide-vue-next'
import SiteContainer from '@/components/SiteContainer.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import SpotlightCard from '@/components/ui/SpotlightCard.vue'
import IconBadge from '@/components/ui/IconBadge.vue'
import { servicePath } from '@/constants/servicePages'
import type { ServiceItem } from '@/types'

interface Props {
  services: readonly ServiceItem[]
}

const props = defineProps<Props>()

const marqueePaused = ref(false)

// Each URL below is the brand's own color logo, verified to return a real
// color PNG (not a small B/W favicon). The fallback covers transient
// network/CORS failures.
const favicon = (domain: string, size = 256) =>
  `https://www.google.com/s2/favicons?sz=${size}&domain=${domain}`

const partnerBrands = [
  {
    name: 'JASIRI',
    // 192×192 color PNG from Jasiri's CMS
    logoSrc: 'https://jasiri.org/wp-content/uploads/2023/08/cropped-Jasiri-favicon-192x192.png',
    logoFallback: favicon('jasiri.org'),
    logoAlt: 'Jasiri logo',
    round: false,
  },
  {
    name: 'Eaglepoint',
    // 1024×1024 color PNG (despite the .jpg extension) — Eaglepoint's apple-touch-icon
    logoSrc: 'https://www.eaglepoint.ai/favicon.jpg',
    logoFallback: favicon('eaglepoint.ai'),
    logoAlt: 'Eaglepoint logo',
    round: false,
  },
  {
    name: 'Ola',
    // White wordmark — the black SVG disappears against the dark marquee background.
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
    logoSrc:
      'https://www.swiggy.com/corporate/wp-content/uploads/2024/11/Swiggy-Logo-1.png',
    logoFallback: favicon('swiggy.com'),
    logoAlt: 'Swiggy logo',
    round: false,
  },
  {
    name: 'beU delivery',
    // 472×132 color PNG hosted on beU's CDN
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

const servicesWithIcons = computed(() => {
  const total = props.services.length
  return props.services.map((service, index) => {
    const isLast = index === total - 1
    // 3-col xl grid plan: cards 0 and 3 span 2 cols. If the final card would land
    // alone on its row (5 items → row 3 has only card index 4), promote it to a
    // full-width banner so nothing is orphaned.
    const wide = index === 0 || index === 3
    const fullWidth = isLast && total % 3 === 2 // 5, 8, 11… → final card orphan
    return {
      ...service,
      icon: serviceIconMap[service.id] ?? Sparkles,
      wide,
      fullWidth,
    }
  })
})
</script>

<template>
  <section
    id="services"
    class="relative pb-[var(--section-pad-y)] sm:pb-[var(--section-pad-y-md)]"
  >
    <div
      class="logo-marquee mb-12 w-full py-8 sm:mb-16 sm:py-10"
      aria-label="Partner brands"
      @pointerenter="marqueePaused = true"
      @pointerleave="marqueePaused = false"
    >
      <SiteContainer>
        <p class="section-tag mb-8 sm:mb-12 block">Trusted by</p>
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

    <SiteContainer>
      <SectionHeading
        tag="What we build"
        title="Everything you need,"
        highlight=" under one roof."
        description="Design, build, and ship from one bench. The same team handles your site, your content, and your launch assets."
      />

      <div class="bento-grid mt-16">
        <RouterLink
          v-for="(service, i) in servicesWithIcons"
          :key="service.id"
          :to="servicePath(service.id)"
          :class="[
            'service-card-link group block h-full no-underline',
            service.fullWidth ? 'bento-full' : service.wide ? 'bento-wide' : '',
          ]"
        >
          <SpotlightCard
            v-reveal="{ delay: (i % 3) * 80 }"
            class="card-pad flex h-full transition-transform duration-300 group-hover:-translate-y-0.5"
          >
            <!-- Full-width banner layout: icon + copy stacked, CTA underneath -->
            <template v-if="service.fullWidth">
              <div class="flex w-full flex-col items-start gap-6">
                <div class="flex items-start gap-4">
                  <IconBadge>
                    <component :is="service.icon" class="h-5 w-5" aria-hidden="true" />
                  </IconBadge>
                  <div>
                    <h3 class="card-title">{{ service.title }}</h3>
                    <p class="mt-2 max-w-[60ch] text-base leading-relaxed text-muted-foreground">
                      {{ service.description }}
                    </p>
                  </div>
                </div>
                <span class="arrow-link sm:ml-16">
                  See More
                  <ArrowRight class="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </div>
            </template>

            <!-- Default vertical layout for normal + wide cards -->
            <template v-else>
              <IconBadge class="mb-4">
                <component :is="service.icon" class="h-5 w-5" aria-hidden="true" />
              </IconBadge>

              <span
                v-if="service.wide"
                class="pointer-events-none absolute right-6 top-6 h-32 w-32 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style="
                  background: radial-gradient(
                    ellipse,
                    rgba(43, 191, 184, 0.16) 0%,
                    transparent 70%
                  );
                "
                aria-hidden="true"
              />

              <h3 class="card-title mb-3">{{ service.title }}</h3>
              <p class="mb-6 flex-1 max-w-[34ch] text-base leading-relaxed text-muted-foreground">
                {{ service.description }}
              </p>
              <span class="arrow-link">
                See More
                <ArrowRight class="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </template>
          </SpotlightCard>
        </RouterLink>
      </div>
    </SiteContainer>
  </section>
</template>

<style scoped>
/* ─── Partner logo marquee ─────────────────────────────────────── */
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

.bento-grid {
  display: grid;
  gap: 1.25rem;
  grid-template-columns: 1fr;
}

.service-card-link:hover .arrow-link {
  gap: 0.65rem;
  color: var(--accent-glow-hex);
}

@media (min-width: 640px) {
  .bento-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 640px) {
  .bento-full {
    grid-column: 1 / -1;
  }
}

@media (min-width: 1280px) {
  .bento-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }

  .bento-wide {
    grid-column: span 2;
  }

  .bento-full {
    grid-column: 1 / -1;
  }
}
</style>
