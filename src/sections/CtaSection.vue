<script setup lang="ts">
import SiteContainer from '@/components/SiteContainer.vue'
</script>

<template>
  <!-- Compact band inspired by WorksVia density — not a literal clone -->
  <section class="cta-band relative py-10 sm:py-12">
    <SiteContainer>
      <div v-reveal class="pinnacle-cta">
        <div class="pinnacle-cta__copy">
          <h2 class="pinnacle-cta__title">Stop assembling vendors. Start shipping.</h2>
          <p class="pinnacle-cta__text">
            One brief. Design, engineering, and strategy pull in the same direction —
            delivery in days, not quarters.
          </p>
        </div>
        <RouterLink to="/get-started" class="pinnacle-cta__link">
          Get started
          <svg
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            stroke-width="1.4"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M2.5 9.5l7-7M4 2.5h5.5V8" />
          </svg>
        </RouterLink>
      </div>
    </SiteContainer>
  </section>
</template>

<style scoped>
.pinnacle-cta {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  min-height: 7.5rem;
  padding: 1.25rem 1.35rem;
  border-radius: 0.65rem;
  border: 1px solid rgba(232, 240, 237, 0.1);
  background:
    radial-gradient(ellipse 80% 120% at 100% 0%, rgba(17, 100, 102, 0.35), transparent 55%),
    linear-gradient(135deg, #0c1917 0%, #071110 55%, #0a1614 100%);
}

.pinnacle-cta::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  background: linear-gradient(
    100deg,
    rgba(7, 17, 16, 0.15) 0%,
    transparent 45%,
    rgba(17, 100, 102, 0.12) 100%
  );
  pointer-events: none;
}

.pinnacle-cta__copy {
  position: relative;
  z-index: 1;
  max-width: 36rem;
}

.pinnacle-cta__title {
  margin: 0 0 0.4rem;
  font-family: var(--font-family-serif);
  font-size: clamp(1.25rem, 2.2vw, 1.5rem);
  font-weight: 500;
  font-style: italic;
  line-height: 1.25;
  letter-spacing: -0.015em;
  color: var(--text-hex);
}

.pinnacle-cta__text {
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.5;
  color: rgba(232, 240, 237, 0.68);
}

.pinnacle-cta__link {
  position: relative;
  z-index: 1;
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding-bottom: 2px;
  border-bottom: 1px solid rgba(43, 191, 184, 0.45);
  font-family: var(--font-family-display);
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-hex);
  text-decoration: none;
  transition:
    color 220ms ease,
    border-color 220ms ease,
    gap 220ms ease;
}

.pinnacle-cta__link svg {
  width: 12px;
  height: 12px;
  transition: transform 220ms ease;
}

.pinnacle-cta__link:hover {
  color: var(--accent-glow-hex);
  border-color: var(--accent-soft-hex);
  gap: 0.55rem;
}

.pinnacle-cta__link:hover svg {
  transform: translate(2px, -2px);
}

@media (min-width: 768px) {
  .pinnacle-cta {
    flex-direction: row;
    align-items: flex-end;
    gap: 2rem;
    min-height: 7rem;
    padding: 1.35rem 1.75rem;
  }

  .pinnacle-cta__link {
    align-self: flex-end;
    flex-shrink: 0;
    margin-bottom: 0.15rem;
  }
}
</style>
