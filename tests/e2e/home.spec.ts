import { test, expect } from '@playwright/test'

test.describe('Home page', () => {
  test('loads with the expected hero copy and per-route title', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Systems that scale\. Designs that convert\./i)
    await expect(page.locator('h1')).toContainText(/Systems/i)
    await expect(page.locator('h1')).toContainText(/Designs That Convert/i)
  })

  test('header mobile menu trigger reports its open/closed state via ARIA', async ({ page }) => {
    // Force the mobile viewport so the trigger is rendered.
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/')

    const trigger = page.getByRole('button', { name: /Open menu/i })
    await expect(trigger).toHaveAttribute('aria-expanded', 'false')
    await trigger.click()
    await expect(page.getByRole('button', { name: /Close menu/i })).toHaveAttribute(
      'aria-expanded',
      'true',
    )
  })
})
