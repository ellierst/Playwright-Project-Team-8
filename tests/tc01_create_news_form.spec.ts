import { test, expect } from '../fixtures/base.page.fixture';
import { login } from '../utils/auth';
import { EcoNewsPage } from '../pages/eco_news.page';
import { CreateNewsPage } from '../pages/create_news.page';
import { step, description, tag, severity, issue } from "allure-js-commons";

test('TC01: Verify Create News form structure', async ({ page }) => {

    await description(
        `Verify that the "Create News" form displays all the necessary fields in the correct order.`
    );
    
    await tag("eco news");
    await tag("create news");

    await severity("MEDIUM");

    await issue("https://github.com/ellierst/Playwright-Project-Team-8/issues/2#issue-4558192995");

    await step("Login to system", async () => {
        await login(page);
    });

    const ecoNewsPage = new EcoNewsPage(page);
    const createNewsPage = new CreateNewsPage(page);

    await step("Open Create News form", async () => {
        await ecoNewsPage.open();
        await ecoNewsPage.clickCreateNews();
    });

    await step("Verify title field", async () => {
        await expect(createNewsPage.form.titleInput).toBeVisible();
        await expect(createNewsPage.form.titleCounter).toContainText('/170');
    });

    await step("Verify tags section", async () => {
        await createNewsPage.form.verifyTags();
    });

    await step("Verify source field", async () => {
        await createNewsPage.form.verifySourceHint();
    });

    await step("Verify image upload section", async () => {
        await createNewsPage.form.verifyDropzone();
    });

    await step("Verify main text editor", async () => {
        await expect(createNewsPage.form.quillEditor).toBeVisible();

        const contentInfo = page.locator('.textarea-wrapper .field-info');
        await expect(contentInfo).toContainText('63 206');
    });

    await step("Verify date and author fields are readonly", async () => {
        await createNewsPage.form.verifyDateField();
        await createNewsPage.form.verifyAuthorField();
    });

    await step("Verify action buttons", async () => {
        await expect(createNewsPage.form.cancelButton).toBeVisible();
        await expect(createNewsPage.form.previewButton).toBeVisible();
        await expect(createNewsPage.form.publishButton).toBeVisible();
    });

    await step("Debug layout positions (optional)", async () => {
        const elements = [
            { name: 'titleInput', el: createNewsPage.form.titleInput },
            { name: 'tagButtons', el: createNewsPage.form.tagButtons.first() },
            { name: 'imageDropzone', el: createNewsPage.form.imageDropzone },
            { name: 'quillEditor', el: createNewsPage.form.quillEditor },
            { name: 'sourceInput', el: createNewsPage.form.sourceInput },
            { name: 'authorField', el: createNewsPage.form.authorField },
            { name: 'dateField', el: createNewsPage.form.dateField },
        ];

        for (const { name, el } of elements) {
            const box = await el.boundingBox();
            console.log(`${name}: y=${box?.y?.toFixed(2)}`);
        }
    });

});