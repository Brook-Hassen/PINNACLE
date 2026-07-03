import { nextTick, ref } from 'vue'

/**
 * Resets scroll position and bumps a reactive key so service-page sections
 * remount and v-reveal bindings reinitialize on every service transition.
 */
export function useAnimationCycle() {
  const cycleKey = ref(0)

  const resetAnimationCycle = async (): Promise<void> => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }

    cycleKey.value += 1

    await nextTick()
    await new Promise<void>((resolve) => {
      requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
    })
  }

  return { cycleKey, resetAnimationCycle }
}
