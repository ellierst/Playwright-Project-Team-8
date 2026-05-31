import { test, expect } from '../fixtures/base.page.fixture';
import { description, severity, step, tag } from 'allure-js-commons';

import { EcoNewsPage } from '../pages/eco_news.page';
import { CreateNewsPage } from '../pages/create_news.page';
import { login } from '../utils/auth';

test('TC08: Verify "Source" field validation', async ({ page }) => {
    const newsTitle = `Test News Source ${Date.now()}`;
    const newsContent = 'This is test content for source validation';
    const validSource = 'https://example.com';

    await description(
        'Verify that the optional "Source" field accepts only valid URLs and displays validation message for invalid input.'
    );

    await tag('eco news');
    await tag('create news');
    await tag('source validation');
    await severity('Normal');

    const ecoNewsPage = new EcoNewsPage(page);
    const createNewsPage = new CreateNewsPage(page);

    await step('Login to the system', async () => {
        await login(page);
    });

    await step('Open Create News form', async () => {
        await ecoNewsPage.open();
        await ecoNewsPage.clickCreateNews();
    });

    await step('Fill mandatory fields with valid data', async () => {
        await createNewsPage.form.fillMandatoryFields(
            newsTitle,
            newsContent,
            'News'
        );
    });

    await step('Verify that empty Source field is allowed', async () => {
        await createNewsPage.form.clearSource();

        expect(
            await createNewsPage.form.isPublishButtonEnabled()
        ).toBeTruthy();
    });

    await step('Verify validation for invalid Source URL', async () => {
        await createNewsPage.form.fillSource('www.example.com');

        expect(
            await createNewsPage.form.isPublishButtonDisabled()
        ).toBeTruthy();

        await expect(createNewsPage.form.sourceInfo).toContainText(
            'Please add the link of original article/news/post'
        );

        await expect(createNewsPage.form.sourceInfo).toContainText(
            'Link must start with http(s)://'
        );
    });

    await step('Verify that valid Source URL is accepted', async () => {
        await createNewsPage.form.fillSource(validSource);

        expect(
            await createNewsPage.form.isPublishButtonEnabled()
        ).toBeTruthy();
    });

    await step('Debug Source field validation state before publishing', async () => {
        const elements = [
            { name: 'sourceInput', el: createNewsPage.form.sourceInput },
            { name: 'sourceInfo', el: createNewsPage.form.sourceInfo },
            { name: 'publishButton', el: createNewsPage.form.publishButton },
        ];

        for (const { name, el } of elements) {
            const box = await el.boundingBox();
            console.log(`${name}: y=${box?.y?.toFixed(2)}`);
        }

        console.log(
            `Source info text: ${await createNewsPage.form.sourceInfo.textContent()}`
        );

        console.log(
            `Publish button disabled: ${await createNewsPage.form.publishButton.isDisabled()}`
        );

        console.log(
            `Publish button enabled: ${await createNewsPage.form.publishButton.isEnabled()}`
        );
    });

    await step('Publish news with valid Source URL', async () => {
        await createNewsPage.form.clickPublish();
    });

    await step('Verify that created news is published successfully', async () => {
        await expect(page).toHaveURL(/news/);
        await expect(page.getByText(newsTitle).first()).toBeVisible();
    });
});