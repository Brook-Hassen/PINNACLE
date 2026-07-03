<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

// Spinning conic-gradient border. Wrap any block to give it an animated rim.
// We gate the animation on IntersectionObserver so the GPU does not paint a
// continuous conic gradient while the beam is scrolled off-screen, and pause
// when the tab is hidden so background tabs do not waste cycles.

const wrapperRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)
let observer: IntersectionObserver | null = null

const handleVisibilityChange = () => {
  // Re-evaluate on tab focus/blur. When hidden, force-pause regardless of
  // viewport state; on return, restore based on whichever IO snapshot was last
  // emitted (the observer will fire fresh entries shortly after).
  if (document.hidden) {
    isVisible.value = false
  }
}

onMounted(() => {
  if (!wrapperRef.value) return
  if (!('IntersectionObserver' in window)) {
    // Older browsers: leave the animation running rather than disable it.
    isVisible.value = true
    return
  }
  observer = new IntersectionObserver(
    (entries) => {
      // Only flip when the *latest* entry is intersecting, so two entries
      // arriving in the same tick do not bounce the state.
      const last = entries[entries.length - 1]
      if (last) isVisible.value = last.isIntersecting && !document.hidden
    },
    { rootMargin: '120px 0px' },
  )
  observer.observe(wrapperRef.value)
  document.addEventListener('visibilitychange', handleVisibilityChange)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  document.removeEventListener('visibilitychange', handleVisibilityChange)
})
</script>

<template>
  <div ref="wrapperRef" class="beam-wrap" :class="{ 'beam-wrap--idle': !isVisible }">
    <div class="beam-spin" aria-hidden="true" />
    <div class="beam-inner">
      <slot />
    </div>
  </div>
</template>

<style scoped>
/* Pause the conic-gradient rotation when the host is off-screen or the tab is
   hidden. Cuts GPU paint cost on long pages where the beam wraps a CTA panel
   below the fold. */
.beam-wrap--idle :deep(.beam-spin) {
  animation-play-state: paused;
}
</style>
