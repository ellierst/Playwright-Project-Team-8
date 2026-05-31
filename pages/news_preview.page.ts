import { Page } from '@playwright/test';
import { NewsPreviewComponent } from '../components/news_preview.component';

export class NewsPreviewPage {
    readonly preview: NewsPreviewComponent;

    constructor(page: Page) {
        this.preview = new NewsPreviewComponent(page);
    }
}