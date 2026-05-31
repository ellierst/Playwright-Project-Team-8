import { test, expect } from '../fixtures/base.page.fixture';
import { login } from '../utils/auth';
import { EcoNewsPage } from '../pages/eco_news.page';
import { CreateNewsPage } from '../pages/create_news.page';
import { step, description, tag, severity } from "allure-js-commons";

test('TC05: Main Text validation - below minimum', async ({ page }) => {

    await description(
        `Verify validation of the Main Text field.
        Ensure the field accepts values within the allowed range (20–63,206 characters)
        and that the Publish button remains disabled when the entered text contains fewer than 20 characters.`
    );
    
    await tag("eco news");
    await tag("create news");
    await tag("validation");

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

    await step("Fill Title and less 20 characters in the Main Text field" , async () => {
        await createNewsPage.form.fillTitle("Test");
        await createNewsPage.form.fillContent("Short text");
        await createNewsPage.form.selectTag("News");
        await expect(createNewsPage.form.errorMessage).toBeVisible();
        await expect(createNewsPage.form.publishButton).toBeDisabled();
    });

    await step("Fill more than 63206 characters in the Main Text field and check Publish button state" , async () => {
        const longText = 'A'.repeat(63207);
        await createNewsPage.form.fillContent(longText);
        await expect(createNewsPage.form.errorMessage).not.toBeVisible();
        await expect(createNewsPage.form.numberCharacters).toBeVisible();
    });

    await step ("Fill valid number of characters in the Main Text field and check Publish button state" , async () => {
        await createNewsPage.form.fillContent("This is a valid content with more than 20 characters.");
        await expect(createNewsPage.form.errorMessage).not.toBeVisible();
        await createNewsPage.form.publishButton.click();
        const profileName = await ecoNewsPage.getProfileName();
        const firstNewsItem = await ecoNewsPage.getFirstNews();
        const author = await firstNewsItem.locator('span.mw').textContent();

        await expect(author).toContain(profileName);
    });
});