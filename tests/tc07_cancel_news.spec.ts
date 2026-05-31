import { test, expect } from '../fixtures/base.page.fixture';
import { login } from '../utils/auth';
import { EcoNewsPage } from '../pages/eco_news.page';
import { CreateNewsPage } from '../pages/create_news.page';
import { ExitCreateNewsModalComponent } from '../components/exit_create_news_modal';
import { step, description, tag, severity, issue } from 'allure-js-commons';

const TITLE = 'Test';
const CONTENT = 'Test content with 20 chars';

test('TC07 Part 1: Verify Cancel button triggers confirmation modal and "Cancel" redirects to news page', async ({ page }) => {

    await description(
        `Verify that clicking the "Cancel" button on the Create News form triggers a confirmation modal.
        Clicking "Cancel" ("Скасувати") should close the form and redirect to the news page.`
    );

    await tag('eco news');
    await tag('create news');
    await tag('cancel window');
    await tag('cancel button');

    await severity('MEDIUM');

    await issue("https://github.com/ellierst/Playwright-Project-Team-8/issues/3#issue-4558227247");

    const ecoNewsPage = new EcoNewsPage(page);
    const createNewsPage = new CreateNewsPage(page);
    const modal = new ExitCreateNewsModalComponent(page);

    await step('Login to system', async () => {
        await login(page);
    });

    await step('Open Create News form and fill fields', async () => {
        await ecoNewsPage.open();
        await ecoNewsPage.clickCreateNews();
        await createNewsPage.form.fillTitle(TITLE);
        await createNewsPage.form.fillContent(CONTENT);
    });

    await step('Click Cancel button', async () => {
        await createNewsPage.form.clickCancel();
    });

    await step('Verify confirmation modal appears with correct text', async () => {
        await modal.verifyModalVisible();
        await modal.verifyModalText();
    });

    await step('Click "Cancel" and verify redirect to news page', async () => {
        await modal.clickCancel();
        await expect(page).toHaveURL(/\/news(?!\/create)/);
        await modal.verifyNotAttached();
    });
});

test('TC07 Part 2: Verify "Continue" dismisses modal and keeps form data intact', async ({ page }) => {

    await description(
        `Verify that clicking the "Continue" (Continue editing) button on the Create News form triggers a confirmation modal.
        Clicking "Continue" ("Продовжити") dismisses the modal and keeps the Create News form open with all previously entered data.`
    );

    await tag('eco news');
    await tag('create news');
    await tag('cancel window');
    await tag('continue button');

    await severity('MEDIUM');

    await issue("https://github.com/ellierst/Playwright-Project-Team-8/issues/3#issue-4558227247");

    const ecoNewsPage = new EcoNewsPage(page);
    const createNewsPage = new CreateNewsPage(page);
    const modal = new ExitCreateNewsModalComponent(page);

    await step('Login to system', async () => {
        await login(page);
    });

    await step('Open Create News form and fill fields', async () => {
        await ecoNewsPage.open();
        await ecoNewsPage.clickCreateNews();
        await createNewsPage.form.fillTitle(TITLE);
        await createNewsPage.form.fillContent(CONTENT);
    });

    await step('Click Continue button', async () => {
        await createNewsPage.form.clickCancel();
    });

    await step('Verify confirmation modal appears', async () => {
        await modal.waitForVisible();
        await expect(modal.cancelButton).toBeVisible();
        await expect(modal.continueButton).toBeVisible();
    });

    await step('Click "Continue" and verify modal closes, form remains with data', async () => {
        await modal.clickContinue();
        await modal.verifyNotAttached();
        await expect(page).toHaveURL(/\/create-news/);
        await expect(createNewsPage.form.titleInput).toHaveValue(TITLE);
        await expect(createNewsPage.form.quillEditor).toContainText(CONTENT);
    });
});