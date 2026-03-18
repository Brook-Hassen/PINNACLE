<script setup lang="ts">
interface Props {
  eyebrow?: string
  title: string
  description?: string
  centered?: boolean
}

withDefaults(defineProps<Props>(), {
  eyebrow: '',
  description: '',
  centered: false,
})
</script>

<template>
  <div :class="centered ? 'text-center' : 'text-left'">
    <p v-if="eyebrow" class="text-xl tracking-[0.01em] text-muted-foreground sm:text-2xl">
      {{ eyebrow }}
    </p>
    <h2 class="mt-1 text-4xl font-semibold leading-none tracking-tight text-foreground sm:text-5xl lg:text-6xl">
      {{ title }}
    </h2>
    <p
      v-if="description"
      :class="centered ? 'mx-auto mt-5 max-w-3xl' : 'mt-5 max-w-3xl'"
      class="text-base leading-relaxed text-muted-foreground sm:text-lg"
    >
      {{ description }}
    </p>
  </div>
</template>
