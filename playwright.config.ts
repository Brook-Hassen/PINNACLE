import { defineConfig, devices } from '@playwright/test'

const isCI = !!process.env.CI

/**
 * In CI we run the production-like preview build so the SSG-rendered HTML +
 * static asset pipeline is exercised end to end. Locally we hit `vite dev`
 * for fast iteration. Either way the tests intercept Formspree rather than
 * depending on a live Formspree account.
 */
const formspreeTestFormId = 'testformid'

export default defineConfig({
  testDir: './tests/e2e',
  testMatch: '**/*.spec.ts',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,
  reporter: isCI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: isCI ? 'http://localhost:4173' : 'http://localhost:5173',
    trace: 'on-first-retry',
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: isCI
      ? `VITE_FORMSPREE_FORM_ID=${formspreeTestFormId} npm run build && npm run preview -- --port 4173`
      : `VITE_FORMSPREE_FORM_ID=${formspreeTestFormId} npm run dev`,
    url: isCI ? 'http://localhost:4173' : 'http://localhost:5173',
    reuseExistingServer: !isCI,
    timeout: 180_000,
  },
})
