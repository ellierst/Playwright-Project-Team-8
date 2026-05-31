import path from 'path';
import { test, expect } from '../fixtures/base.page.fixture';
import { login } from '../utils/auth';
import { EcoNewsPage } from '../pages/eco_news.page';
import { CreateNewsPage } from '../pages/create_news.page';
import { step, description, tag, severity } from 'allure-js-commons';

test.use({
    permissions: [],
});

test('TC04: Verify Upload Image field validation', async ({ page }) => {
    await description(
        'Verify validation of the "Upload Image" field: accepted formats PNG/JPG, maximum size 10MB.'
    );

    await tag('eco news');
    await tag('create news');
    await tag('upload image');
    await severity('HIGH');

    const validPng = path.join(__dirname, '../test-data/images/valid-image.png');
    const invalidGif = path.join(__dirname, '../test-data/images/invalid-image.gif');
    const largeJpg = path.join(__dirname, '../test-data/images/large-image.jpg');

    await step('Login to system', async () => {
        await login(page);
    });

    const ecoNewsPage = new EcoNewsPage(page);
    const createNewsPage = new CreateNewsPage(page);

    await step('Open Create News form', async () => {
        await ecoNewsPage.open();
        await ecoNewsPage.clickCreateNews();
    });

    await step('Upload valid PNG image and verify successful upload', async () => {
        await createNewsPage.form.uploadImage(validPng);

        await expect(createNewsPage.form.cancelCropButton).toBeVisible();

        console.log('Valid PNG uploaded successfully. Cropper controls are visible.');

        await createNewsPage.form.cancelUploadedImage();
    });

    await step('Upload invalid GIF image and verify validation error', async () => {
        await createNewsPage.form.uploadImage(invalidGif);

        await createNewsPage.form.expectImageUploadError();

        console.log(
            `GIF validation message: ${await createNewsPage.form.getImageErrorText()}`
        );
    });

    await step('Upload oversized JPEG image and verify validation error', async () => {
        await createNewsPage.form.uploadImage(largeJpg);

        await createNewsPage.form.expectImageUploadError();

        console.log(
            `Large JPEG validation message: ${await createNewsPage.form.getImageErrorText()}`
        );
    });

});