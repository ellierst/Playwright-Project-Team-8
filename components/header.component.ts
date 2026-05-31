import { Page, Locator } from '@playwright/test';

export class Header {
    private signInButton: Locator;
    private ecoNewsLink: Locator;
    readonly nameProfile: Locator;

    constructor(private page: Page) {
        this.signInButton = this.page
            .getByRole('link', { name: /sign in|Увійти/i })
            .or(page.getByRole('img', { name: /sing in button/i }))
            .first();

        this.ecoNewsLink = page.locator('header a[href="#/greenCity/news"]');
        this.nameProfile = page.locator('ul#header_user-wrp > li.user-name');
    }

    async clickSignIn() {
    await this.signInButton.first().click();
    }

    async clickEcoNews() {
        await this.ecoNewsLink.click();
    }

    async exists(): Promise<boolean> {
        return await this.ecoNewsLink.count() > 0;
    }

    async isVisible(): Promise<boolean> {
        return await this.ecoNewsLink.isVisible().catch(() => false);
    }
}