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
        // DEBUG
        console.log('Modal root visible:', await this.root.isVisible());
        console.log('Email input count:', await this.emailInput.count());
        console.log('Password input count:', await this.passwordInput.count());
        console.log('Submit button count:', await this.submitButton.count());
        console.log('Submit disabled before fill:', await this.submitButton.isDisabled());

        await this.fillEmail(email);
        console.log('Email filled, value:', await this.emailInput.inputValue());

        await this.fillPassword(password);
        console.log('Password filled, length:', (await this.passwordInput.inputValue()).length);

        console.log('Submit disabled after fill:', await this.submitButton.isDisabled());
        await this.submit();
    }
}