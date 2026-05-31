import { Page, Locator } from '@playwright/test';

export class EcoNewsComponent {
    private readonly createNewsButton: Locator;

    constructor(private page: Page) {
        this.createNewsButton = page.locator('a[href="#/greenCity/news/create-news"]');
    }

    async clickCreateNews() {
        if (await this.createNewsButton.isVisible()) {
            await this.createNewsButton.click();
        }
        else {
            throw new Error('Create News button is not visible');
        }
    }
}