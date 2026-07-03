<script setup lang="ts">
interface Props {
  withNoise?: boolean
  withDotGrid?: boolean
  variant?: 'full' | 'soft'
}

withDefaults(defineProps<Props>(), {
  withNoise: true,
  withDotGrid: true,
  variant: 'full',
})
</script>

<template>
  <div class="aurora-backdrop" aria-hidden="true">
    <div class="aurora-blob aurora-blob--a" />
    <div v-if="variant === 'full'" class="aurora-blob aurora-blob--b" />
    <div v-if="variant === 'full'" class="aurora-blob aurora-blob--c" />
    <div v-if="withDotGrid" class="dot-grid" />
    <div v-if="withNoise" class="noise" />
  </div>
</template>

<style scoped>
.aurora-backdrop {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}
</style>
