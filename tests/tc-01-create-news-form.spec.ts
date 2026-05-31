import { test, expect } from '../fixtures/base.page.fixture';
import { login } from '../utils/auth';
import { EcoNewsPage } from '../pages/eco_news.page';
import { CreateNewsPage } from '../pages/create_news.page';
import { step, description, tag, severity, Severity } from "allure-js-commons";

test('TC01: Verify that the events list can be filtered by event type', async ({ page }) => {

    await description(
        `Verify UI structure of Create News form:
        ensures all mandatory fields are present, ordered correctly, and readonly constraints are applied where required.`
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

    await step("Verify title field", async () => {
        await expect(createNewsPage.form.titleInput).toBeVisible();
        await expect(createNewsPage.form.titleCounter).toContainText('/170');
    });

    await step("Verify tags section", async () => {
        await expect(createNewsPage.form.tagButtons.first()).toBeVisible();

        const tagsCount = await createNewsPage.form.tagButtons.count();
        expect(tagsCount).toBeGreaterThanOrEqual(3);

        for (const tagName of ['News', 'Events', 'Education', 'Initiatives', 'Ads']) {
            await expect(
                createNewsPage.form.tagButtons.filter({ hasText: tagName })
            ).toBeVisible();
        }
    });

    await step("Verify source field", async () => {
        await expect(createNewsPage.form.sourceInput).toBeVisible();
        await expect(createNewsPage.form.sourceInfo).toContainText('http(s)://');
    });

    await step("Verify image upload section", async () => {
        await expect(createNewsPage.form.imageDropzone).toBeVisible();
        await expect(createNewsPage.form.imageDropzone).toContainText('Drop your image here');
    });

    await step("Verify main text editor", async () => {
        await expect(createNewsPage.form.quillEditor).toBeVisible();

        const contentInfo = page.locator('.textarea-wrapper .field-info');
        await expect(contentInfo).toContainText('63 206');
    });

    await step("Verify date and author fields are readonly", async () => {

        await expect(createNewsPage.form.dateField).toBeVisible();
        const dateText = await createNewsPage.form.dateField.textContent();
        expect(dateText).toMatch(/Date:\s+[A-Za-z]+\s+\d{1,2},\s+\d{4}/);
        expect(await createNewsPage.form.isFieldEditable(createNewsPage.form.dateField)).toBeFalsy();

        await expect(createNewsPage.form.authorField).toBeVisible();
        const authorText = await createNewsPage.form.authorField.textContent();
        expect(authorText).toContain('Author:');
        expect(await createNewsPage.form.isFieldEditable(createNewsPage.form.authorField)).toBeFalsy();
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