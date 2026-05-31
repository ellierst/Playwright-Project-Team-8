import { Page } from '@playwright/test';
import { CreateNewsFormComponent } from '../components/create_news.components';

export class CreateNewsPage {
    readonly page: Page;
    readonly form: CreateNewsFormComponent;

    constructor(page: Page) {
        this.page = page;
        this.form = new CreateNewsFormComponent(page);
    }

    async open(): Promise<void> {
        await this.page.goto('/#/greenCity/news/create-news');
    }
}