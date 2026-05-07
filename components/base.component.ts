import { Locator, Page } from '@playwright/test';

export class BaseComponent {
    protected page: Page;
    protected root: Locator;

    constructor(page: Page, root: Locator) {
        this.page = page;
        this.root = root;
    }
}