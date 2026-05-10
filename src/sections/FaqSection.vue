<script setup lang="ts">
import SiteContainer from '@/components/SiteContainer.vue'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import type { FaqItem } from '@/types'

interface Props {
  items: readonly FaqItem[]
}

defineProps<Props>()
</script>

<template>
  <section class="py-14 sm:py-16">
    <SiteContainer>
      <div class="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
        <div class="self-end">
          <h2 class="text-6xl font-semibold leading-none text-foreground sm:text-7xl">FAQ</h2>
          <p class="mt-4 max-w-md text-lg leading-relaxed text-muted-foreground sm:text-2xl">
            Everything you need to know about working with us.
          </p>
        </div>

        <Accordion type="single" collapsible class="pt-4">
          <AccordionItem v-for="item in items" :key="item.id" :value="item.id" class="border-b border-border">
            <AccordionTrigger class="py-5 text-left text-xl font-medium text-foreground sm:text-2xl">
              {{ item.question }}
            </AccordionTrigger>
            <AccordionContent class="pb-5 pr-8 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {{ item.answer }}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </SiteContainer>
  </section>
</template>
