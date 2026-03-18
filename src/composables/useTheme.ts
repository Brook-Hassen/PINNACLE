import { onMounted, ref, watch, type Ref } from 'vue'

interface UseTheme {
  isDark: Ref<boolean>
  toggleTheme: () => void
}

/**
 * Controls light/dark mode using a single class on the document root.
 * Returns a reactive theme flag and toggle handler.
 */
export function useTheme(): UseTheme {
  const isDark = ref<boolean>(false)

  onMounted(() => {
    const savedTheme = localStorage.getItem('theme')
    isDark.value = savedTheme === 'dark'
  })

  watch(
    isDark,
    (value) => {
      document.documentElement.classList.toggle('dark', value)
      localStorage.setItem('theme', value ? 'dark' : 'light')
    },
    { immediate: true },
  )

  const toggleTheme = (): void => {
    isDark.value = !isDark.value
  }

  return { isDark, toggleTheme }
}
