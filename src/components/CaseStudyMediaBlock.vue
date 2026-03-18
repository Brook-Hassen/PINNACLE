<script setup lang="ts">
import { computed } from 'vue'

import type { CaseStudyMedia } from '@/types'

interface Props {
  media: CaseStudyMedia
  heightClass?: string
  controls?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  heightClass: 'h-44',
  controls: false,
})

const isImage = computed<boolean>(() => props.media.type === 'image')
</script>

<template>
  <div class="overflow-hidden rounded-lg border border-border/60">
    <img
      v-if="isImage"
      :src="media.src"
      :alt="media.alt"
      :class="`${heightClass} w-full object-cover`"
      loading="lazy"
      width="1280"
      height="720"
    />
    <video
      v-else
      :class="`${heightClass} w-full object-cover`"
      :src="media.src"
      :poster="media.poster"
      :aria-label="media.alt"
      muted
      playsinline
      loop
      autoplay
      preload="metadata"
      :controls="controls"
    />
  </div>
</template>
