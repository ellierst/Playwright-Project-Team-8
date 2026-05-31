import { Page, Locator } from '@playwright/test';

export class Footer {
    private readonly ecoNewsLink: Locator;

    constructor(private page: Page) {
        this.ecoNewsLink = page.locator('footer a[href="#/greenCity/news"]');
    }

    async clickEcoNews() {
        await this.ecoNewsLink.click({ force: true });
    }

    async exists(): Promise<boolean> {
        return await this.ecoNewsLink.count() > 0;
    }
}