<script setup lang="ts">
import logoMark from '@/assets/brand/pinnacle_logomark.svg'
import { APP_NAME, APP_TAGLINE } from '@/constants'

interface Props {
  compact?: boolean
}

withDefaults(defineProps<Props>(), {
  compact: false,
})
</script>

<template>
  <div class="flex items-center gap-3">
    <img
      v-if="!compact"
      :src="logoMark"
      alt="PINNACLE AI logo mark"
      class="h-8 w-8"
      loading="lazy"
      width="32"
      height="32"
    />
    <div>
      <p :class="compact ? 'text-xl' : 'text-2xl'" class="font-semibold leading-none text-foreground">
        {{ APP_NAME }}
      </p>
      <p v-if="!compact" class="mt-1 text-sm leading-snug text-muted-foreground">{{ APP_TAGLINE }}</p>
    </div>
  </div>
</template>
