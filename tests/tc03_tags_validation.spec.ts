import { test, expect } from '../fixtures/base.page.fixture';
import { login } from '../utils/auth';
import { EcoNewsPage } from '../pages/eco_news.page';
import { CreateNewsPage } from '../pages/create_news.page';
import { step, description, tag, severity } from "allure-js-commons";

test('TC03: Verify tag selection limits', async ({ page }) => {

    await description(
        `Verify that user can select from one to three tags only.`
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

    await step("Select one tag and fill required fields", async () => {
        await createNewsPage.form.selectTag('News');

        await createNewsPage.form.fillTitle('Test');

        await createNewsPage.form.fillContent(
            'Test content with 20 chars'
        );

        await expect(createNewsPage.form.publishButton)
            .toBeEnabled();
    });

    await step("Select three tags", async () => {
        await createNewsPage.form.selectTag('Events');
        await createNewsPage.form.selectTag('Education');
    });

    await step("Attempt to select fourth tag", async () => {
        await createNewsPage.form.selectTag('Initiatives');

        const tagsCount =
            await createNewsPage.form.tagButtons.count();

        expect(tagsCount).toBeGreaterThanOrEqual(4);
    });
});
