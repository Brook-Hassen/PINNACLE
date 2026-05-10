<script setup lang="ts">
import { computed, type Component } from 'vue'
import { Clapperboard, Megaphone, MonitorSmartphone, Network, Sparkles, SwatchBook } from 'lucide-vue-next'
import SiteContainer from '@/components/SiteContainer.vue'
import type { ServiceItem } from '@/types'

interface Props {
  services: readonly ServiceItem[]
}

const props = defineProps<Props>()

const partnerBrands = [
  {
    name: 'JASIRI',
    logoSrc: 'https://jasiri.org/wp-content/uploads/2023/08/cropped-Jasiri-favicon-192x192.png',
    logoAlt: 'Jasiri logo',
  },
  {
    name: 'Eaglepoint',
    logoSrc: 'https://www.eaglepoint.ai/favicon.jpg',
    logoAlt: 'Eaglepoint logo',
  },
  {
    name: 'SOLAR 23',
    logoSrc:
      'https://static.wixstatic.com/media/f01157_5544720e2b844eeda0cfe5db0b4f8012~mv2.png/v1/fill/w_293,h_77,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/SOLAR23-LOGO_red_2015.png',
    logoAlt: 'Solar 23 logo',
  },
  {
    name: 'Google',
    logoSrc: 'https://www.google.com/favicon.ico',
    logoAlt: 'Google logo',
  },
  {
    name: '[Cog] anyone can code',
    logoSrc: 'https://www.anyonecancode.com/favicon.ico',
    logoAlt: 'Anyone Can Code logo',
  },
  {
    name: 'beu delivery',
    logoSrc: 'https://beudelivery.com/imgs/beu-logo.png',
    logoAlt: 'beU delivery logo',
  },
] as const

const serviceIconMap: Record<ServiceItem['id'], Component> = {
  'video-photo-editing': Clapperboard,
  'graphics-design': SwatchBook,
  'web-app-development': MonitorSmartphone,
  'system-design': Network,
  'social-media-management': Megaphone,
}

const servicesWithIcons = computed(() =>
  props.services.map((service) => ({
    ...service,
    icon: serviceIconMap[service.id] ?? Sparkles,
  })),
)
</script>

<template>
  <section id="services" class="py-12 sm:py-16">
    <SiteContainer>
      <div class="logo-marquee mb-10 border-y border-border/60 pb-5 pt-4 sm:mb-12 sm:pb-6 sm:pt-5">
        <div class="logo-marquee__viewport">
          <div class="logo-marquee__track">
            <div class="logo-marquee__group" aria-label="Partner brands">
              <article v-for="brand in partnerBrands" :key="brand.name" class="logo-marquee__item">
                <img
                  :src="brand.logoSrc"
                  :alt="brand.logoAlt"
                  class="logo-marquee__image"
                  loading="lazy"
                  decoding="async"
                  draggable="false"
                  referrerpolicy="no-referrer"
                />
                <p class="text-center text-sm font-semibold text-muted-foreground sm:text-base">
                  {{ brand.name }}
                </p>
              </article>
            </div>
            <div class="logo-marquee__group" aria-hidden="true">
              <article v-for="brand in partnerBrands" :key="`${brand.name}-duplicate`" class="logo-marquee__item">
                <img
                  :src="brand.logoSrc"
                  alt=""
                  class="logo-marquee__image"
                  loading="lazy"
                  decoding="async"
                  draggable="false"
                  referrerpolicy="no-referrer"
                />
                <p class="text-center text-sm font-semibold text-muted-foreground sm:text-base">
                  {{ brand.name }}
                </p>
              </article>
            </div>
          </div>
        </div>
      </div>

      <p class="text-2xl text-muted-foreground">Our Capabilities</p>
      <h2 class="mt-1 text-5xl font-semibold leading-none text-foreground sm:text-6xl">What We Build</h2>
      <p class="mt-3 max-w-3xl text-base text-muted-foreground sm:text-lg">
        We provide the technical and creative infrastructure required to scale modern brands.
      </p>

      <div class="services-grid mt-12">
        <article
          v-for="service in servicesWithIcons"
          :key="service.id"
          class="service-card group rounded-[1.75rem] border border-border/70 bg-card/45 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-foreground/18 hover:bg-card/75 sm:p-7 lg:p-8"
        >
          <div
            class="flex h-14 w-14 items-center justify-center rounded-full border border-border/80 bg-background/70 text-foreground transition-colors duration-300 group-hover:border-foreground/30 group-hover:text-white"
          >
            <component :is="service.icon" class="h-5 w-5" aria-hidden="true" />
          </div>
          <h3 class="mt-6 text-2xl font-semibold leading-tight text-foreground sm:text-[1.9rem]">
            {{ service.title }}
          </h3>
          <p class="mt-4 max-w-[34ch] text-base leading-relaxed text-muted-foreground sm:text-lg">
            {{ service.description }}
          </p>
        </article>
      </div>
    </SiteContainer>
  </section>
</template>

<style scoped>
.logo-marquee {
  --marquee-gap: clamp(2.25rem, 4vw, 4.5rem);
  overflow: hidden;
}

.logo-marquee__viewport {
  overflow: hidden;
  mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
}

.logo-marquee__track {
  display: flex;
  width: max-content;
  gap: var(--marquee-gap);
  animation: partner-glide 28s linear infinite;
  will-change: transform;
}

.logo-marquee__group {
  display: flex;
  min-width: max-content;
  align-items: stretch;
  gap: var(--marquee-gap);
}

.logo-marquee__item {
  flex: 0 0 auto;
  display: flex;
  min-width: clamp(7rem, 10vw, 8.5rem);
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 0.9rem;
  white-space: nowrap;
}

.logo-marquee__image {
  height: 2.75rem;
  width: auto;
  max-width: 6rem;
  object-fit: contain;
  object-position: center;
  filter: saturate(0);
  opacity: 0.92;
}

@keyframes partner-glide {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(calc(-50% - (var(--marquee-gap) / 2)));
  }
}

@media (prefers-reduced-motion: reduce) {
  .logo-marquee__track {
    animation: none;
  }
}

.services-grid {
  display: grid;
  gap: 1.25rem;
  align-items: stretch;
}

.service-card {
  display: flex;
  min-height: 100%;
  flex-direction: column;
  justify-content: flex-start;
  box-shadow: 0 18px 42px -34px rgba(0, 0, 0, 0.85);
}

@media (min-width: 768px) {
  .services-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.5rem;
  }

  .service-card:last-child:nth-child(odd) {
    grid-column: 1 / -1;
  }
}

@media (min-width: 1280px) {
  .services-grid {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }

  .service-card {
    grid-column: span 2 / span 2;
  }

  .service-card:last-child:nth-child(odd) {
    grid-column: span 2 / span 2;
  }

  .service-card:nth-last-child(2):nth-child(3n + 1) {
    grid-column: 2 / span 2;
  }
}
</style>
