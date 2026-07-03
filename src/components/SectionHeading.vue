<script setup lang="ts">
/**
 * The single source of truth for every page-section header.
 * Uses the design-system tokens defined in `assets/main.css`
 * (--font-h2, --font-lead, section-title, section-description),
 * so every section renders the same typographic scale and rhythm.
 *
 * To roll back to per-section inline headings, see the
 * UI_CONSISTENCY_REPORT.md rollback section.
 */
interface Props {
  tag?: string
  eyebrow?: string
  title: string
  highlight?: string
  description?: string
  centered?: boolean
  /** Hide the accent line under the heading (rare) */
  hideAccentLine?: boolean
  /** Bumps reveal animation when the active service changes */
  cycleKey?: number
}

withDefaults(defineProps<Props>(), {
  tag: '',
  eyebrow: '',
  highlight: '',
  description: '',
  centered: false,
  hideAccentLine: false,
  cycleKey: 0,
})
</script>

<template>
  <div
    v-reveal="{ blur: true, cycleKey }"
    :class="centered ? 'text-center' : 'text-left'"
    class="section-heading-block"
  >
    <p v-if="tag" class="section-tag mb-8 block sm:mb-12">{{ tag }}</p>
    <p
      v-if="eyebrow"
      class="text-xl tracking-[0.01em] text-muted-foreground sm:text-2xl"
      :class="tag ? 'mt-2' : ''"
    >
      {{ eyebrow }}
    </p>

    <h2 class="section-title" :class="eyebrow ? 'mt-3' : ''">
      <!-- Consumer controls spacing inside `highlight` — pass a leading space
           when you want the gradient text to sit on its own word. -->
      {{ title }}<span v-if="highlight" class="gradient-text">{{ highlight }}</span>
    </h2>

    <div
      v-if="!hideAccentLine"
      class="accent-line mt-6"
      :class="centered ? 'mx-auto' : ''"
    />

    <p
      v-if="description"
      class="section-description mt-6"
      :class="centered ? 'mx-auto' : ''"
    >
      {{ description }}
    </p>
  </div>
</template>
