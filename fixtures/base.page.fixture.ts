import { test as base, expect } from '@playwright/test';
import { BasePage } from '../pages/base.page';

export const test = base.extend<{
    page: typeof base;
}>({
    page: async ({ browser }, use) => {
        const context = await browser.newContext();
        const page = await context.newPage();

        const basePage = new BasePage(page);
        await basePage.open();

        await use(page);
        await context.close();
    },
});

export { expect };