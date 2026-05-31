import { test, expect } from '../fixtures/base.page.fixture';
import { login } from '../utils/auth';
import { EcoNewsPage } from '../pages/eco_news.page';
import { CreateNewsPage } from '../pages/create_news.page';
import { step, description, tag, severity } from "allure-js-commons";


test('TC05-01: Main Text < 20 chars shows validation error', async ({ page }) => {
    await description(`TC05-01: Verify validation of Main Text field when input is below minimum (20 chars).
Ensure error message is displayed and Publish button remains disabled.`);

    await tag('eco news');
    await tag('create news');
    await tag('validation');

    await severity('normal');

    await step("Login to system", async () => {
    await login(page);
    });

    const ecoNewsPage = new EcoNewsPage(page);
    const createNewsPage = new CreateNewsPage(page);
    
    await step("Open and fill Create News form", async () => {
    await ecoNewsPage.open();
    await ecoNewsPage.clickCreateNews();

    await createNewsPage.form.fillTitle("Test");
    await createNewsPage.form.selectTag("News");
    await createNewsPage.form.fillContent("Short text");

    await expect(createNewsPage.form.errorMessage).toBeVisible();
    await expect(createNewsPage.form.publishButton).toBeDisabled();
    });
});

test('TC05-02: Main Text > 63206 chars is handled correctly', async ({ page }) => {
    await description(`TC05-02: Verify behavior when Main Text exceeds maximum allowed length (63,206 chars).
Ensure UI handles overflow according to specification.`);

    await tag('eco news');
    await tag('create news');
    await tag('validation');

    await severity('normal');

    await step("Login to system", async () => {
    await login(page);
    });

    const ecoNewsPage = new EcoNewsPage(page);
    const createNewsPage = new CreateNewsPage(page);

    await step("Open and fill Create News form", async () => {
    await ecoNewsPage.open();
    await ecoNewsPage.clickCreateNews();

    const longText = 'A'.repeat(63207);
    await createNewsPage.form.fillTitle("Test");
    await createNewsPage.form.selectTag("News");
    await createNewsPage.form.fillContent(longText);

    await expect(createNewsPage.form.errorMessage).not.toBeVisible();
    });
});

test('TC05-03: Valid Main Text allows publishing news', async ({ page }) => {
    await description(`TC05-03: Verify successful publication when Main Text length is within valid range (20–63,206 chars).
Ensure Publish button is enabled and news is created successfully.`);

    await tag('eco news');
    await tag('create news');
    await tag('validation');

    await severity('critical');

    await step("Login to system", async () => {
        await login(page);
    });

    const ecoNewsPage = new EcoNewsPage(page);
    const createNewsPage = new CreateNewsPage(page);

    await step("Open and fill Create News form", async () => {
    await ecoNewsPage.open();
    await ecoNewsPage.clickCreateNews();

    await createNewsPage.form.fillTitle("Test");
    await createNewsPage.form.selectTag("News");

    await createNewsPage.form.fillContent(
        "This is valid content with more than 20 characters"
    );

    await expect(createNewsPage.form.errorMessage).not.toBeVisible();

    await createNewsPage.form.publishButton.click();

    const profileName = await ecoNewsPage.getProfileName();
    const firstNewsItem = await ecoNewsPage.getFirstNews();
    const author = await firstNewsItem.locator('span.mw').textContent();

    expect(author).toContain(profileName);
    });
});

