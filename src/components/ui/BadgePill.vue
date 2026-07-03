<script setup lang="ts">
interface Props {
  withDot?: boolean
}

withDefaults(defineProps<Props>(), {
  withDot: true,
})
</script>

<template>
  <span class="badge-pill">
    <span v-if="withDot" class="glow-dot" />
    <slot />
  </span>
</template>
