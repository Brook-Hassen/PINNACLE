import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

/**
 * Vitest is intentionally separate from vite.config.ts so the SSG/Tailwind/
 * devtools plugin stack doesn't run for every unit test. We only need Vue SFC
 * compilation here.
 */
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'happy-dom',
    include: ['src/**/__tests__/**/*.test.ts', 'src/**/*.test.ts'],
    // Playwright E2E specs live under tests/e2e — keep Vitest out of them.
    exclude: ['node_modules/**', 'dist/**', 'tests/e2e/**', '.vite-ssg-temp/**'],
    globals: false,
    clearMocks: true,
  },
})
