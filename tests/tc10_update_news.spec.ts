import { test, expect } from '../fixtures/base.page.fixture';
import { login } from '../utils/auth';
import { EcoNewsPage } from '../pages/eco_news.page';
import { CreateNewsPage } from '../pages/create_news.page';
import { step, description, tag, severity } from "allure-js-commons";

test('TC10: Update news', async ({ page }) => {
    await description(`TC10: Verify that a user can update an existing news item.`);
    await tag('eco news');
    await tag('update news');
    await severity('critical');

    await step("Login to system", async () => {
        await login(page);
    });

    const ecoNewsPage = new EcoNewsPage(page);
    const createNewsPage = new CreateNewsPage(page);
    const profileName = await ecoNewsPage.getProfileName();
    const myNews = await ecoNewsPage.getNews().filter({
    has: page.locator('span.mw', { hasText: profileName })});

    await step("Open existing news item", async () => {
        await ecoNewsPage.open();
        await myNews.first().click();
    });

    await step("Click Edit News and update content", async () => {
        await ecoNewsPage.clickEditNews();
        const timestamp = Date.now();
        await createNewsPage.form.fillTitle(`Updated news ${timestamp}`);
        await createNewsPage.form.fillContent(`Updated: ${new Date().toISOString()}`);
        await createNewsPage.form.clickPublish();
        await expect(myNews.first().locator('h3')).toHaveText(`Updated news ${timestamp}`);
    });

});