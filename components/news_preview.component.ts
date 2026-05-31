import { Page, Locator, expect } from '@playwright/test';
import { BaseComponent } from './base.component';

export class NewsPreviewComponent extends BaseComponent {
    readonly titleText: Locator;
    readonly contentText: Locator;
    readonly dateText: Locator;
    readonly authorText: Locator;
    readonly backToEditingButton: Locator;

    constructor(page: Page) {
        const root = page.locator('app-news-preview-page');
        super(page, root);

        this.titleText = root.locator('.news-title-container');
        this.contentText = root.locator('.news-text-container');
        this.dateText = root.locator('.news-info-date');
        this.authorText = root.locator('.news-info-author');
        this.backToEditingButton = root.locator('.back-button .button-text');
    }

    async verifyPreviewTitle(title: string): Promise<void> {
        await expect(this.titleText).toContainText(title);
    }

    async verifyPreviewContent(content: string): Promise<void> {
        await expect(this.contentText).toContainText(content);
    }

    async verifyCurrentDateIsDisplayed(): Promise<void> {
        await expect(this.dateText).toBeVisible();

        const date = await this.dateText.textContent() ?? '';

        expect(date).toMatch(
            /[A-Za-z]+\s+\d{1,2},\s+\d{4}/
        );
    }

    async verifyAuthorIsDisplayed(): Promise<void> {
        await expect(this.authorText).toBeVisible();
    }

    async verifyBackToEditingButton(): Promise<void> {
        await expect(this.backToEditingButton).toBeVisible();
    }
}