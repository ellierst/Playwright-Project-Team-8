import { test, expect } from '@playwright/test';

/**
 * Smoke test — checks that Playwright project is configured correctly.
 * This test does NOT verify real application functionality.
 */
test('framework smoke test', async ({ page }) => {
  // Open base URL from playwright.config.ts (env.BASE_URL)
  await page.goto('/');

  // Verify that the page object is created and browser works
  expect(page).toBeTruthy();

  // Optional: check that page loads something (basic sanity check)
  const title = await page.title();
  expect(title).toBeDefined();
});