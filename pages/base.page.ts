import { Page } from '@playwright/test';

export class BasePage {
    constructor(private page: Page) {}

    async open() {
        await this.page.goto('/#/greenCity/events');
    }
}