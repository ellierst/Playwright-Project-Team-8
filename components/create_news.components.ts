import { Page, Locator, expect } from '@playwright/test';
import { BaseComponent } from './base.component';

export const FORM_TEXT = {
    en: {
        dropzone: 'Drop your image here',
        sourceHint: 'http(s)://',
        tags: ['News', 'Events', 'Education', 'Initiatives', 'Ads'],
        datePrefix: 'Date:',
        authorPrefix: 'Author:',
        datePattern: /Date:\s+[A-Za-z]+\s+\d{1,2},\s+\d{4}/,
    },
    uk: {
        dropzone: 'Перетягніть зображення сюди',
        sourceHint: 'http(s)://',
        tags: ['Новини', 'Події', 'Освіта', 'Ініціативи', 'Реклама'],
        datePrefix: 'Дата:',
        authorPrefix: 'Автор:',
        datePattern: /Дата:\s+\d{1,2}\s+[А-Яа-яІіЇїЄє]+\s+\d{4}/,
    },
};

export class CreateNewsFormComponent extends BaseComponent {
    readonly titleInput: Locator;
    readonly titleCounter: Locator;
    readonly tagButtons: Locator;
    readonly sourceInput: Locator;
    readonly sourceInfo: Locator;
    readonly imageDropzone: Locator;
    readonly quillEditor: Locator;
    readonly dateField: Locator;
    readonly authorField: Locator;
    readonly cancelButton: Locator;
    readonly previewButton: Locator;
    readonly publishButton: Locator;

    constructor(page: Page) {
        const root = page.locator('form[enctype="multipart/form-data"]').first();
        super(page, root);

        this.titleInput = root.locator('textarea[formcontrolname="title"]');
        this.titleCounter = root.locator('.title-block .field-info');
        this.tagButtons = root.locator('.tags-box .tag-button');
        this.sourceInput = root.locator('input[formcontrolname="source"]');
        this.sourceInfo = root.locator('.source-block .field-info');
        this.imageDropzone = root.locator('.dropzone');
        this.quillEditor = root.locator('quill-editor .ql-editor');
        this.dateField = root.locator('.date p').filter({ hasText: /Date:|Дата:/ });
        this.authorField = root.locator('.date p').filter({ hasText: /Author:|Автор:/ });
        this.cancelButton = root.locator('.submit-buttons button.tertiary-global-button');
        this.previewButton = root.locator('.submit-buttons button.secondary-global-button');
        this.publishButton = root.locator('.submit-buttons button.primary-global-button[type="submit"]');
    }

    async fillTitle(title: string): Promise<void> {
        await this.titleInput.fill(title);
    }

    async selectTag(tagName: string): Promise<void> {
        await this.tagButtons.filter({ hasText: tagName }).click();
    }

    async fillContent(text: string): Promise<void> {
        await this.quillEditor.click();
        await this.quillEditor.fill(text);
    }

    async fillSource(url: string): Promise<void> {
        await this.sourceInput.fill(url);
    }

    async clickCancel(): Promise<void> {
        await this.cancelButton.click();
    }

    async clickPreview(): Promise<void> {
        await this.previewButton.click();
    }

    async clickPublish(): Promise<void> {
        await this.publishButton.click();
    }

    async fillMandatoryFields(title: string, content: string, tagName: string): Promise<void> {
        await this.fillTitle(title);
        await this.selectTag(tagName);
        await this.fillContent(content);
    }

    async clearSource(): Promise<void> {
        await this.sourceInput.clear();
    }

    async getSourceValidationText(): Promise<string> {
        return (await this.sourceInfo.textContent())?.trim() ?? '';
    }

    async isPublishButtonDisabled(): Promise<boolean> {
        return await this.publishButton.isDisabled();
    }

    async isPublishButtonEnabled(): Promise<boolean> {
        return await this.publishButton.isEnabled();
    }

    async verifyDropzone(): Promise<void> {
        await expect(this.imageDropzone).toBeVisible();

        const text = await this.imageDropzone.textContent() ?? '';
        const isEnglish = text.includes(FORM_TEXT.en.dropzone);
        const isUkrainian = text.includes(FORM_TEXT.uk.dropzone);

        expect(
            isEnglish || isUkrainian,
            `Unexpected dropzone text: "${text.trim()}"`
        ).toBeTruthy();
    }

    async verifySourceHint(): Promise<void> {
        await expect(this.sourceInput).toBeVisible();
        await expect(this.sourceInfo).toContainText(FORM_TEXT.en.sourceHint);
    }

    async verifyTags(): Promise<void> {
        await expect(this.tagButtons.first()).toBeVisible();

        const count = await this.tagButtons.count();
        expect(count).toBeGreaterThanOrEqual(3);

        const firstTagText = await this.tagButtons.first().textContent() ?? '';
        const isEnglish = FORM_TEXT.en.tags.some(tagName => firstTagText.includes(tagName));
        const locale = isEnglish ? 'en' : 'uk';

        for (const tagName of FORM_TEXT[locale].tags) {
            await expect(
                this.tagButtons.filter({ hasText: tagName }),
                `Tag "${tagName}" not found`
            ).toBeVisible();
        }
    }

    async verifyDateField(): Promise<void> {
        await expect(this.dateField).toBeVisible();

        const text = await this.dateField.textContent() ?? '';
        const matchesEnglish = FORM_TEXT.en.datePattern.test(text);
        const matchesUkrainian = FORM_TEXT.uk.datePattern.test(text);

        expect(
            matchesEnglish || matchesUkrainian,
            `Unexpected date format: "${text.trim()}"`
        ).toBeTruthy();

        expect(await this.isFieldEditable(this.dateField)).toBeFalsy();
    }

    async verifyAuthorField(): Promise<void> {
        await expect(this.authorField).toBeVisible();

        const text = await this.authorField.textContent() ?? '';
        const isEnglish = text.includes(FORM_TEXT.en.authorPrefix);
        const isUkrainian = text.includes(FORM_TEXT.uk.authorPrefix);

        expect(
            isEnglish || isUkrainian,
            `Unexpected author field text: "${text.trim()}"`
        ).toBeTruthy();

        expect(await this.isFieldEditable(this.authorField)).toBeFalsy();
    }
}