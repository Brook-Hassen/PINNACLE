<script setup lang="ts">
import { computed, type Component } from 'vue'
import { Blocks, BriefcaseBusiness, Rocket, Sparkles, Users, Workflow } from 'lucide-vue-next'
import SiteContainer from '@/components/SiteContainer.vue'
import SectionHeading from '@/components/SectionHeading.vue'
import type { BenefitItem } from '@/types'

interface Props {
  benefits: readonly BenefitItem[]
}

const props = defineProps<Props>()

const benefitIconMap: Record<BenefitItem['id'], Component> = {
  'rapid-market-entry': Rocket,
  'direct-expert-access': Users,
  'integrated-ecosystems': Workflow,
  'management-led-strategy': BriefcaseBusiness,
  'architectural-precision': Blocks,
}

const benefitsWithIcons = computed(() =>
  props.benefits.map((benefit) => ({
    ...benefit,
    icon: benefitIconMap[benefit.id] ?? Sparkles,
  })),
)
</script>

<template>
  <section id="work" class="section-y relative overflow-hidden">
    <SiteContainer>
      <SectionHeading
        tag="Why teams pick us"
        title="Tired of stitching"
        highlight=" freelancers together?"
        description="One brief, one team. Senior people on the work from day one, with replies measured in hours, not ticket queues."
      />

      <div class="benefit-grid mt-10 sm:mt-16">
        <article
          v-for="(benefit, i) in benefitsWithIcons"
          :key="benefit.id"
          v-reveal="{ delay: i * 70 }"
          class="benefit-card"
        >
          <div class="benefit-card__icon" aria-hidden="true">
            <component :is="benefit.icon" class="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <h3 class="benefit-card__title">{{ benefit.title }}</h3>
          <p class="benefit-card__copy">
            {{ benefit.description }}
          </p>
        </article>
      </div>
    </SiteContainer>
  </section>
</template>

<style scoped>
.benefit-grid {
  /* WorksVia why__grid: keep 2×2 on phone */
  display: grid;
  gap: 0.65rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

@media (min-width: 640px) {
  .benefit-grid {
    gap: 0.9rem;
  }
}

/* 3 on top, bottom two centered across a 6-col track */
@media (min-width: 1024px) {
  .benefit-grid {
    grid-template-columns: repeat(6, minmax(0, 1fr));
    gap: 1rem;
  }

  .benefit-card:nth-child(1),
  .benefit-card:nth-child(2),
  .benefit-card:nth-child(3) {
    grid-column: span 2;
  }

  .benefit-card:nth-child(4) {
    grid-column: 2 / 4;
  }

  .benefit-card:nth-child(5) {
    grid-column: 4 / 6;
  }
}

.benefit-card {
  position: relative;
  overflow: hidden;
  border-radius: 0.9rem;
  border: 1px solid rgba(232, 240, 237, 0.1);
  background:
    radial-gradient(420px circle at 12% 0%, rgba(43, 191, 184, 0.1), transparent 55%),
    linear-gradient(165deg, rgba(23, 35, 32, 0.95), rgba(10, 18, 16, 0.98));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
  padding: 0.95rem;
  transition:
    border-color 280ms var(--ease-out-premium),
    transform 280ms var(--ease-out-premium),
    box-shadow 280ms var(--ease-out-premium);
}

@media (min-width: 640px) {
  .benefit-card {
    border-radius: 1.1rem;
    padding: 1.35rem 1.35rem 1.5rem;
  }
}

.benefit-card::after {
  content: '';
  position: absolute;
  inset: auto 1.25rem 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(43, 191, 184, 0.35), transparent);
  opacity: 0;
  transition: opacity 280ms ease;
}

.benefit-card:hover {
  border-color: rgba(43, 191, 184, 0.38);
  transform: translateY(-3px);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.06),
    0 22px 48px -30px rgba(43, 191, 184, 0.4);
}

.benefit-card:hover::after {
  opacity: 1;
}

.benefit-card__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.15rem;
  height: 2.15rem;
  border-radius: 0.65rem;
  border: 1px solid rgba(43, 191, 184, 0.32);
  background: rgba(17, 100, 102, 0.16);
  color: var(--accent-soft-hex);
  box-shadow: 0 0 20px rgba(17, 100, 102, 0.18);
  transition:
    border-color 280ms ease,
    background-color 280ms ease,
    box-shadow 280ms ease;
}

@media (min-width: 640px) {
  .benefit-card__icon {
    width: 2.75rem;
    height: 2.75rem;
    border-radius: 0.8rem;
  }
}

.benefit-card__title {
  margin-top: 0.75rem;
  font-family: var(--font-family-display);
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.25;
  letter-spacing: -0.02em;
  color: var(--text-hex);
}

.benefit-card__copy {
  margin-top: 0.4rem;
  font-size: 0.7rem;
  line-height: 1.45;
  color: var(--text-muted-hex);
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (min-width: 640px) {
  .benefit-card__title {
    margin-top: 1.25rem;
    font-size: var(--font-h3);
    line-height: var(--leading-snug);
  }

  .benefit-card__copy {
    margin-top: 0.75rem;
    font-size: 0.95rem;
    line-height: 1.55;
    -webkit-line-clamp: unset;
    display: block;
  }
}

.benefit-card:hover .benefit-card__icon {
  border-color: rgba(43, 191, 184, 0.5);
  background: rgba(17, 100, 102, 0.24);
  box-shadow: 0 0 26px rgba(43, 191, 184, 0.28);
}

@media (prefers-reduced-motion: reduce) {
  .benefit-card:hover {
    transform: none;
  }
}
</style>
