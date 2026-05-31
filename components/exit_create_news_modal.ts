import { Page, Locator, expect } from '@playwright/test';
import { BaseComponent } from './base.component';

const MODAL_TEXT = {
    en: {
        title: 'All created content will be lost',
        subtitle: 'Do you still want to cancel news creating?',
    },
    uk: {
        title: 'Внесені зміни будуть втрачені',
        subtitle: 'Ви впевнені, що хочете видалити новину?',
    },
};

export class ExitCreateNewsModalComponent extends BaseComponent {
    readonly titleText: Locator;
    readonly subtitleText: Locator;
    readonly continueButton: Locator;
    readonly cancelButton: Locator;
    readonly closeButton: Locator;

    constructor(page: Page) {
        const root = page.locator('app-warning-pop-up');
        super(page, root);

        this.titleText = root.locator('.warning-title');
        this.subtitleText = root.locator('.warning-subtitle');
        this.continueButton = root.locator('button.secondary-global-button');
        this.cancelButton = root.locator('button.primary-global-button');
        this.closeButton = root.locator('button.close');
    }

    async clickCancel(): Promise<void> {
        await this.cancelButton.click();
    }

    async clickContinue(): Promise<void> {
        await this.continueButton.click();
    }

    async clickClose(): Promise<void> {
        await this.closeButton.click();
    }

    async verifyModalVisible(): Promise<void> {
        await this.waitForVisible();
        await expect(this.titleText).toBeVisible();
        await expect(this.subtitleText).toBeVisible();
        await expect(this.continueButton).toBeVisible();
        await expect(this.cancelButton).toBeVisible();
    }

    async verifyModalText(): Promise<void> {
        const titleText = await this.titleText.textContent() ?? '';
        const subtitleText = await this.subtitleText.textContent() ?? '';

        const isEnglish = titleText.includes(MODAL_TEXT.en.title);
        const isUkrainian = titleText.includes(MODAL_TEXT.uk.title);

        expect(
            isEnglish || isUkrainian,
            `Unexpected modal title: "${titleText.trim()}"`
        ).toBeTruthy();

        if (isEnglish) {
            expect(subtitleText).toContain(MODAL_TEXT.en.subtitle);
        } else {
            expect(subtitleText).toContain(MODAL_TEXT.uk.subtitle);
        }
    }

    async verifyNotAttached(): Promise<void> {
        await expect(this.root).not.toBeAttached();
    }
}