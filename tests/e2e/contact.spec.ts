import { test, expect } from '@playwright/test'

/**
 * The contact form posts to Formspree. The network call is intercepted so this
 * test runs without a live Formspree account. Turnstile is gated client-side
 * on VITE_TURNSTILE_SITE_KEY — when it's empty, the captcha widget never
 * renders and the submit button is enabled as soon as the fields validate.
 */
test.describe('Contact form', () => {
  test('shows the success banner after a mocked successful submission', async ({ page }) => {
    await page.route('**/formspree.io/**', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ ok: true }),
      })
    })

    await page.goto('/get-started')

    await page.getByLabel('Name').fill('Jane Doe')
    await page.getByLabel('Email').fill('jane@example.com')
    await page.getByRole('button', { name: 'Telegram' }).click()
    await page.getByLabel('Telegram username').fill('@janedoe')
    await page.getByRole('button', { name: 'Graphics Design' }).click()
    await page
      .getByLabel('Project details')
      .fill('Hi team, I would like to talk about a new project.')

    await page.getByRole('button', { name: /Send Message/i }).click()

    await expect(page.getByText(/Thanks for writing/i)).toBeVisible()
  })

  test('surfaces the server message when Formspree returns a failure', async ({ page }) => {
    await page.route('**/formspree.io/**', async (route) => {
      await route.fulfill({
        status: 422,
        contentType: 'application/json',
        body: JSON.stringify({
          ok: false,
          error: 'You are sending messages too quickly. Please wait a moment and try again.',
        }),
      })
    })

    await page.goto('/get-started')

    await page.getByLabel('Name').fill('Jane Doe')
    await page.getByLabel('Email').fill('jane@example.com')
    await page.getByRole('button', { name: 'Telegram' }).click()
    await page.getByLabel('Telegram username').fill('@janedoe')
    await page.getByRole('button', { name: 'Graphics Design' }).click()
    await page
      .getByLabel('Project details')
      .fill('Hi team, I would like to talk about a new project.')

    await page.getByRole('button', { name: /Send Message/i }).click()

    await expect(page.getByText(/sending messages too quickly/i)).toBeVisible()
  })
})
