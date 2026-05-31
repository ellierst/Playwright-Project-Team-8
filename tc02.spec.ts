import { test, expect } from '../fixtures/base.page.fixture';
import { login } from '../utils/auth';
import { EcoNewsPage } from '../pages/eco_news.page';
import { CreateNewsPage } from '../pages/create_news.page';
import { step, description, tag, severity } from "allure-js-commons";

test('TC02: Verify Title validation and Publish button state', async ({ page }) => {

    await description(
        `Verify Title field validation, character limit and Publish button availability.`
    );

    await tag("eco news");
    await tag("create news");

    await severity("Normal");

    await step("Login to system", async () => {
        await login(page);
    });

    const ecoNewsPage = new EcoNewsPage(page);
    const createNewsPage = new CreateNewsPage(page);

    await step("Open Create News form", async () => {
        await ecoNewsPage.open();
        await ecoNewsPage.clickCreateNews();
    });

    await step("Verify empty title state", async () => {
        await createNewsPage.form.fillTitle('');

        await expect(createNewsPage.form.publishButton).toBeDisabled();
        await expect(createNewsPage.form.titleCounter).toContainText('0/170');
    });

    await step("Verify title length limit", async () => {
        const longTitle = 'A'.repeat(171);

        await createNewsPage.form.fillTitle(longTitle);

        const actualTitle =
            await createNewsPage.form.titleInput.inputValue();

        expect(actualTitle.length).toBeLessThanOrEqual(170);
    });

    await step("Enter valid title", async () => {
        await createNewsPage.form.fillTitle('Test News');

        await expect(createNewsPage.form.titleCounter)
            .toContainText('9/170');

        await expect(createNewsPage.form.publishButton)
            .toBeDisabled();
    });

    await step("Fill required fields", async () => {
        await createNewsPage.form.selectTag('News');

        await createNewsPage.form.fillContent(
            'Test content for publication'
        );

        await expect(createNewsPage.form.publishButton)
            .toBeEnabled();
    });
});
