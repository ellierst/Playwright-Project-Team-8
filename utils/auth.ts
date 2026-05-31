import { Page } from '@playwright/test';
import { BasePage } from '../pages/base.page';
import { LoginPage } from '../pages/login.page';

export async function login(page: Page): Promise<void> {
    const basePage = new BasePage(page);
    await basePage.open();

    const loginPage = new LoginPage(page);
    await loginPage.login(process.env.TEST_EMAIL!, process.env.TEST_PASSWORD!);
}