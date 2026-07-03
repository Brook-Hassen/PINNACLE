<script setup lang="ts">
import SectionHeading from '@/components/SectionHeading.vue'
import SiteContainer from '@/components/SiteContainer.vue'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Plus } from 'lucide-vue-next'
import type { FaqItem } from '@/types'

interface Props {
  items: readonly FaqItem[]
}

defineProps<Props>()
</script>

<template>
  <section id="faq" class="section-y relative">
    <SiteContainer>
      <div class="faq-frame overflow-hidden rounded-[var(--radius-card-lg)]">
        <div class="px-6 py-8 sm:py-12">
          <SectionHeading
            centered
            tag="Frequently asked"
            title="FAQ"
            highlight="."
            description="Straight answers below. Still stuck? Write us. We reply within a day."
          />
        </div>

        <div class="px-4 py-8 sm:px-8 sm:py-12 lg:px-16">
          <Accordion
            type="single"
            collapsible
            :default-value="items[0]?.id"
            class="mx-auto flex max-w-2xl flex-col gap-3"
          >
            <AccordionItem
              v-for="item in items"
              :key="item.id"
              :value="item.id"
              class="border-0"
            >
              <AccordionTrigger
                class="group w-full justify-start gap-2 rounded-none p-0 text-left hover:no-underline sm:w-auto"
              >
                <span
                  class="min-w-0 rounded-[1.5rem] border border-foreground/15 bg-card/85 px-4 py-3 text-sm font-medium leading-snug text-foreground shadow-[0_14px_35px_-26px_rgba(17,100,102,0.85)] backdrop-blur transition-all duration-300 group-data-[state=open]:rounded-b-md group-data-[state=open]:border-[rgba(43,191,184,0.5)] group-data-[state=open]:bg-[var(--accent-hex)] group-data-[state=open]:text-white sm:px-6"
                >
                  {{ item.question }}
                </span>

                <template #icon>
                  <span
                    class="grid size-9 shrink-0 place-items-center rounded-full border border-foreground/10 bg-card/70 text-foreground transition-all duration-300 group-data-[state=open]:rotate-45 group-data-[state=open]:border-[rgba(43,191,184,0.5)] group-data-[state=open]:bg-[var(--accent-hex)] group-data-[state=open]:text-white"
                    aria-hidden="true"
                  >
                    <Plus class="size-4" />
                  </span>
                </template>
              </AccordionTrigger>

              <AccordionContent
                class="-mt-px ml-0 max-w-xl rounded-[1.5rem] rounded-tl-none border border-foreground/12 bg-card/95 px-4 pb-4 pt-4 text-sm leading-relaxed text-muted-foreground shadow-[0_22px_60px_-35px_rgba(17,100,102,0.65)] sm:ml-3 sm:px-6"
              >
                {{ item.answer }}
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div
            class="mx-auto mt-12 flex max-w-2xl flex-col items-stretch justify-center gap-3 pt-2 sm:flex-row sm:items-center"
          >
            <RouterLink to="/get-started" class="btn-primary-pill sm:w-auto">
              Contact Us
            </RouterLink>
          </div>
        </div>
      </div>
    </SiteContainer>
  </section>
</template>

<style scoped>
.faq-frame {
  position: relative;
  background: var(--background-hex);
}

/* Soft radial border — strongest mid-edge, fading toward corners into the page bg */
.faq-frame::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: radial-gradient(
    ellipse 105% 100% at 50% 50%,
    rgba(236, 242, 239, 0.22) 0%,
    rgba(236, 242, 239, 0.14) 38%,
    rgba(236, 242, 239, 0.05) 62%,
    transparent 78%
  );
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask-composite: exclude;
  pointer-events: none;
}
</style>
