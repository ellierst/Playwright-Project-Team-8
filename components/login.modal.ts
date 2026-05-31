import { Page, Locator, expect } from '@playwright/test';
import { BaseComponent } from './base.component';

export class LoginModal extends BaseComponent {
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly submitButton: Locator;

    constructor(page: Page) {
        const root = page.locator('[role="dialog"], .modal-content, .cdk-overlay-pane').first();
        super(page, root);

        this.emailInput = root.locator('#email');
        this.passwordInput = root.locator('#password');
        this.submitButton = root.locator('button.greenStyle');
    }

    async fillEmail(email: string): Promise<void> {
        await this.emailInput.waitFor({ state: 'visible', timeout: 10000 });
        await this.emailInput.click();
        await this.emailInput.clear();
        await this.emailInput.fill(email);
    }

    async fillPassword(password: string): Promise<void> {
        await this.passwordInput.waitFor({ state: 'visible', timeout: 10000 });
        await this.passwordInput.click();
        await this.passwordInput.clear();
        await this.passwordInput.fill(password);
    }

    async submit(): Promise<void> {
        await expect(this.submitButton).toBeEnabled({ timeout: 10000 });
        await this.submitButton.click();
    }

    async login(email: string, password: string): Promise<void> {
        await this.fillEmail(email);
        await this.fillPassword(password);
        await this.submit();
    }
}