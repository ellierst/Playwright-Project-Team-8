import { Page, Locator } from '@playwright/test';

export class EcoNewsComponent {
    private readonly createNewsButton: Locator;
    private readonly editNewsButton: Locator;

    constructor(private page: Page) {
        this.createNewsButton = page.locator('a[href="#/greenCity/news/create-news"]');
        this.editNewsButton = page.locator('a > .edit-news');
    }

    async clickCreateNews() {
        if (await this.createNewsButton.isVisible()) {
            await this.createNewsButton.click();
        }
        else {
            throw new Error('Create News button is not visible');
        }
    }

    async clickEditNews() {
        await this.editNewsButton.waitFor({ state: 'visible', timeout: 5000 });
        await this.editNewsButton.click();
    }
}