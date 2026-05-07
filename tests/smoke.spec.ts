import { test, expect } from '@playwright/test';

/**
 * Smoke test — checks that Playwright project is configured correctly.
 * This test does NOT verify real application functionality.
 */
test('framework smoke test', async ({ page }) => {
  // Navigate to a blank page — no real server required
  await page.goto('about:blank');

  // Verify that the page object is created and browser works
  expect(page).toBeTruthy();

  // Basic sanity check: title is defined (will be empty string, which is fine)
  const title = await page.title();
  expect(title).toBeDefined();
});