<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import SiteContainer from '@/components/SiteContainer.vue'
import BadgePill from '@/components/ui/BadgePill.vue'
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
    class="relative flex min-h-[100svh] items-center overflow-hidden pt-[var(--section-pad-y)] sm:pt-[var(--section-pad-y-md)]"
  >
    <!-- Subtle dot grid + noise only; no aurora blobs on the hero so the teal
         glow stays concentrated around the cube. -->
    <div class="dot-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
    <div class="noise pointer-events-none absolute inset-0" aria-hidden="true" />

    <SiteContainer class="relative z-10">
      <div class="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div>
          <div class="anim-fade-up" style="animation-delay: 0.05s">
            <BadgePill>Development · Design · Strategy</BadgePill>
          </div>

          <h1
            class="hero-display anim-fade-up mt-4 text-balance text-[length:var(--font-display)] font-semibold tracking-tight text-foreground"
            style="animation-delay: 0.1s"
          >
            <span class="hero-display__line block">Systems</span>
            <span class="hero-display__line block">That Scale.</span>
            <span class="hero-display__line block text-shimmer">Designs That Convert.</span>
          </h1>

          <p
            class="anim-fade-up mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            style="animation-delay: 0.2s"
          >
            Stop settling for fragmented tools. We provide an integrated suite of development,
            creative, and consulting services designed to automate your workflow and accelerate your
            market dominance.
          </p>

          <div
            class="anim-fade-up mt-8 flex flex-wrap items-center gap-3"
            style="animation-delay: 0.3s"
          >
            <RouterLink to="/get-started" class="btn-primary-pill btn-lg group">
              Get Started
              <ArrowRight class="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </RouterLink>
          </div>

        </div>

        <div
          class="anim-fade-up relative mx-auto hidden h-[440px] w-[640px] max-w-full lg:block"
          style="animation-delay: 0.25s"
        >
          <!-- Tight, cube-only halo. Smaller, dimmer, no spill onto the page. -->
          <div
            class="hero-halo-breathe pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[220px] w-[240px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-55"
            style="
              background: radial-gradient(
                ellipse 50% 50% at 50% 50%,
                rgba(17, 100, 102, 0.20) 0%,
                rgba(17, 100, 102, 0.06) 40%,
                transparent 75%
              );
              filter: blur(10px);
            "
            aria-hidden="true"
          />
          <RubiksCubeMini class="h-full w-full" />
        </div>
      </div>
    </SiteContainer>

    <div class="bottom-fade" />
  </section>
</template>
