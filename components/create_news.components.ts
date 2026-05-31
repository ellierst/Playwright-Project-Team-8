import { Page, Locator, expect } from '@playwright/test';
import { BaseComponent } from './base.component';

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
        this.dateField = root.locator('.date p').filter({ hasText: 'Date:' });
        this.authorField = root.locator('.date p').filter({ hasText: 'Author:' });
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
}