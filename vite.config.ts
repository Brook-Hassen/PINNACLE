import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

import { SERVICE_SLUGS } from './src/constants/serviceSlugs'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isProd = mode === 'production'

  return {
    plugins: [vue(), ...(!isProd ? [vueDevTools()] : []), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    // The Hero chunk carries Three.js for the protected Rubik's cube; raising
    // the limit silences the noise while still flagging genuinely large new
    // chunks.
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Function form: returns undefined for SSR-externalized modules so
        // the server build doesn't choke on `vue` being marked external.
        manualChunks(id) {
          if (
            id.includes('node_modules/vue/') ||
            id.includes('node_modules/vue-router/') ||
            id.includes('node_modules/pinia/') ||
            id.includes('node_modules/@vue/')
          ) {
            return 'vue-vendor'
          }
          return undefined
        },
      },
    },
  },
  // vite-ssg extends UserConfig with `ssgOptions` at runtime. The cast keeps
  // TypeScript happy without depending on a global module-augmentation file.
  ssgOptions: {
    formatting: 'minify',
    // beasties (above-the-fold CSS inlining) interacts poorly with the
    // Tailwind v4 stylesheet today; keep CSS in a single external file.
    crittersOptions: false,
    includedRoutes(paths: string[]) {
      const staticPaths = paths.filter((p) => !p.includes(':'))
      const dynamic = SERVICE_SLUGS.map((slug) => `/services/${slug}`)
      return [...staticPaths, ...dynamic]
    },
  },
  }
})
