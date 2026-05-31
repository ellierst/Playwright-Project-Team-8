import { Locator, Page } from '@playwright/test';

export class BaseComponent {
    protected page: Page;
    protected root: Locator;

    constructor(page: Page, root: Locator) {
        this.page = page;
        this.root = root;
    }

    async isFieldEditable(locator: Locator): Promise<boolean> {
        return await locator.evaluate((el) => {
            const element = el as HTMLElement;

            return (
                element.isContentEditable ||
                !!element.closest('input, textarea, [contenteditable]')
            );
        });
    }

    async waitForVisible(): Promise<void> {
        await this.root.waitFor({ state: 'visible', timeout: 10000 });
    }
}