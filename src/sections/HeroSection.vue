<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import SiteContainer from '@/components/SiteContainer.vue'
import { APP_NAME } from '@/constants'
import { ArrowRight } from 'lucide-vue-next'

// The hero renders eagerly, but its WebGL cube carries Three.js — by far the
// heaviest dependency on the page. Keep ONLY the cube code-split so the hero
// text/CTA paint immediately while Three.js loads after first paint. The cube
// is decorative and sits in a fixed-size container, so deferring it causes no
// layout shift.
const RubiksCubeMini = defineAsyncComponent(() => import('@/components/RubiksCubeMini.vue'))
</script>

<template>
  <section
    id="home"
    class="relative flex min-h-[100svh] items-center overflow-hidden pt-16"
  >
    <!-- Top wash so the fixed transparent nav sits on teal atmosphere, not dead black -->
    <div
      class="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(ellipse_90%_120%_at_50%_-10%,rgba(17,100,102,0.28),transparent_70%)]"
      aria-hidden="true"
    />
    <div class="aurora-blob aurora-blob--a" aria-hidden="true" />
    <div class="aurora-blob aurora-blob--b" aria-hidden="true" />
    <div class="dot-grid opacity-60" aria-hidden="true" />
    <div class="noise noise--hero pointer-events-none absolute inset-0" aria-hidden="true" />

    <SiteContainer class="relative z-10 w-full py-12 sm:py-16 lg:py-20">
      <!-- WorksVia mobile: left-aligned copy + side-by-side CTAs; cube sits beside on sm+ -->
      <div class="grid items-center gap-8 sm:gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12 xl:gap-16">
        <div class="hero-copy relative w-full max-w-2xl text-left lg:max-w-none">
          <p
            class="anim-fade-up font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--accent-soft-hex)]"
            style="animation-delay: 0s"
          >
            {{ APP_NAME }}
          </p>

          <h1
            class="hero-display anim-fade-up mt-4 text-balance text-[length:var(--font-display)] text-foreground sm:mt-5"
            style="animation-delay: 0.08s"
          >
            <span class="hero-display__line block">Systems That Scale.</span>
            <span class="hero-display__line hero-display__accent block">Designs That Convert.</span>
          </h1>

          <p
            class="anim-fade-up mt-5 max-w-[36rem] text-[0.9375rem] leading-6 text-muted-foreground sm:mt-6 sm:text-[1.075rem] sm:leading-7"
            style="animation-delay: 0.16s"
          >
            Stop settling for fragmented tools. We provide an integrated suite of development,
            creative, and consulting services designed to automate your workflow and accelerate your
            market dominance.
          </p>

          <div
            class="anim-fade-up mt-7 flex flex-row flex-wrap items-center gap-2.5 sm:mt-9 sm:gap-3"
            style="animation-delay: 0.24s"
          >
            <RouterLink to="/get-started" class="btn-primary-pill btn-lg group flex-1 sm:flex-none">
              Get Started
              <ArrowRight class="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </RouterLink>
            <RouterLink to="/#services" class="btn-outline-pill btn-lg group flex-1 sm:flex-none">
              Explore services
              <span aria-hidden="true" class="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
            </RouterLink>
          </div>
        </div>

        <div
          class="anim-fade-up relative mx-auto h-[220px] w-full max-w-[280px] sm:h-[300px] sm:max-w-[360px] lg:mx-0 lg:h-[440px] lg:max-w-[560px]"
          style="animation-delay: 0.25s"
        >
          <div
            class="hero-halo-breathe pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[160px] w-[180px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 sm:h-[200px] sm:w-[220px] lg:h-[240px] lg:w-[260px]"
            style="
              background: radial-gradient(
                ellipse 50% 50% at 50% 50%,
                rgba(43, 191, 184, 0.22) 0%,
                rgba(17, 100, 102, 0.08) 42%,
                transparent 75%
              );
              filter: blur(12px);
            "
            aria-hidden="true"
          />
          <RubiksCubeMini class="h-full w-full" />
        </div>
      </div>
    </SiteContainer>

    <div class="scroll-cue anim-fade-up" style="animation-delay: 0.5s" aria-hidden="true">
      <span />
    </div>
    <div class="bottom-fade" />
  </section>
</template>

<style scoped>
/* Editorial accent — Newsreader italic, no shimmer / glow sweep */
.hero-display__accent {
  font-family: var(--font-family-serif);
  font-style: italic;
  font-weight: 500;
  letter-spacing: -0.02em;
  color: var(--accent-soft-hex);
}
</style>
