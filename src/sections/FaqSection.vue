<script setup lang="ts">
import SiteContainer from '@/components/SiteContainer.vue'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { ChevronDown } from 'lucide-vue-next'
import type { FaqItem } from '@/types'

interface Props {
  items: readonly FaqItem[]
}

defineProps<Props>()
</script>

<template>
  <!-- WorksVia-dense FAQ: hairline rows, compact type, no chat bubbles -->
  <section id="faq" class="faq-section relative">
    <SiteContainer>
      <div class="faq-layout">
        <header class="faq-intro">
          <p class="faq-intro__eyebrow">FAQ</p>
          <h2 class="faq-intro__title">Answers, without the fluff.</h2>
          <p class="faq-intro__copy">
            Straight answers below. Still stuck? Write us — we reply within a day.
          </p>
          <RouterLink to="/get-started" class="btn-primary-pill group mt-5">
            Contact us
            <span aria-hidden="true" class="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
          </RouterLink>
        </header>

        <Accordion
          type="single"
          collapsible
          :default-value="items[0]?.id"
          class="faq-list"
        >
          <AccordionItem
            v-for="item in items"
            :key="item.id"
            :value="item.id"
            class="faq-item border-0"
          >
            <AccordionTrigger class="faq-trigger group hover:no-underline">
              <span class="faq-question">{{ item.question }}</span>
              <template #icon>
                <ChevronDown
                  class="faq-chevron size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180 group-data-[state=open]:text-[var(--accent-soft-hex)]"
                  aria-hidden="true"
                />
              </template>
            </AccordionTrigger>
            <AccordionContent class="faq-answer">
              {{ item.answer }}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </SiteContainer>
  </section>
</template>

<style scoped>
.faq-section {
  padding-block: var(--space-12);
}

@media (min-width: 640px) {
  .faq-section {
    padding-block: var(--space-16);
  }
}

.faq-layout {
  display: grid;
  gap: 1.5rem;
}

@media (min-width: 1024px) {
  .faq-layout {
    grid-template-columns: minmax(0, 0.72fr) minmax(0, 1.28fr);
    gap: 2.5rem;
    align-items: start;
  }
}

.faq-intro__eyebrow {
  margin: 0 0 0.75rem;
  font-family: var(--font-family-mono);
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent-soft-hex);
}

.faq-intro__title {
  margin: 0;
  max-width: 14ch;
  font-family: var(--font-family-serif);
  font-size: clamp(1.75rem, 3vw, 2.25rem);
  font-weight: 500;
  font-style: italic;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: var(--text-hex);
}

.faq-intro__copy {
  margin: 0.85rem 0 0;
  max-width: 28rem;
  font-size: 0.9375rem;
  line-height: 1.55;
  color: var(--text-muted-hex);
}

.faq-list {
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--border-soft);
}

.faq-item {
  border-bottom: 1px solid var(--border-soft) !important;
}

.faq-trigger {
  gap: 1rem;
  width: 100%;
  padding: 0.85rem 0 !important;
  text-align: left;
}

.faq-question {
  flex: 1;
  min-width: 0;
  font-family: var(--font-family-display);
  font-size: 0.9375rem;
  font-weight: 600;
  line-height: 1.4;
  letter-spacing: -0.015em;
  color: var(--text-hex);
  transition: color 180ms ease;
}

.faq-trigger:hover .faq-question,
.faq-trigger[data-state='open'] .faq-question {
  color: var(--accent-soft-hex);
}

.faq-answer {
  padding: 0 0 0.95rem !important;
  max-width: 40rem;
  font-size: 0.875rem;
  line-height: 1.55;
  color: var(--text-muted-hex);
}

.faq-chevron {
  margin-left: auto;
}
</style>
