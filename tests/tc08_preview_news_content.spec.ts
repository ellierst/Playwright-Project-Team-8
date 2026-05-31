import { test, expect } from '../fixtures/base.page.fixture';
import { description, severity, step, tag } from 'allure-js-commons';

import { login } from '../utils/auth';
import { EcoNewsPage } from '../pages/eco_news.page';
import { CreateNewsPage } from '../pages/create_news.page';
import { NewsPreviewPage } from '../pages/news_preview.page';

test('TC08: Verify news preview content', async ({ page }) => {
    const randomId = Math.floor(Math.random() * 10000);
    const newsTitle = `Test Preview ${randomId}`;
    const newsContent = 'This is a test preview content';

    await description(
        'Verify that the user can preview news content after entering valid data and that the preview matches the input.'
    );

    await tag('eco news');
    await tag('create news');
    await tag('preview');
    await severity('Normal');

    const ecoNewsPage = new EcoNewsPage(page);
    const createNewsPage = new CreateNewsPage(page);
    const newsPreviewPage = new NewsPreviewPage(page);

    await step('Login to the system', async () => {
        await login(page);
    });

    await step('Open Create News form', async () => {
        await ecoNewsPage.open();
        await ecoNewsPage.clickCreateNews();
    });

    await step('Fill valid news data', async () => {
        await createNewsPage.form.fillMandatoryFields(
            newsTitle,
            newsContent,
            'News'
        );
    });

    await step('Open news preview', async () => {
        await createNewsPage.form.clickPreview();
    });

    await step('Verify preview title and content', async () => {
        await newsPreviewPage.preview.verifyPreviewTitle(newsTitle);
        await newsPreviewPage.preview.verifyPreviewContent(newsContent);
    });

    await step('Verify preview additional information', async () => {
        await newsPreviewPage.preview.verifyCurrentDateIsDisplayed();
        await newsPreviewPage.preview.verifyAuthorIsDisplayed();
        await newsPreviewPage.preview.verifyBackToEditingButton();
    });

    await step('Verify preview URL', async () => {
        await expect(page).toHaveURL(/preview/);
    });
});