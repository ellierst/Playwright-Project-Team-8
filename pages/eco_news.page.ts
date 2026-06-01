import { Page } from '@playwright/test';
import { Header } from '../components/header.component';
import { Footer } from '../components/footer.component';
import { EcoNewsComponent } from '../components/eco_news.components';

export class EcoNewsPage {
    private readonly page: Page;
    private readonly header: Header;
    private readonly footer: Footer;
    private readonly ecoNewsComponent: EcoNewsComponent;

    constructor(page: Page) {
        this.page = page;
        this.header = new Header(page);
        this.footer = new Footer(page);
        this.ecoNewsComponent = new EcoNewsComponent(page);
    }

    async open() {
        if (await this.header.exists()) {
            try {
                await this.header.clickEcoNews();
                return;
            } catch {
                console.log('Header click failed');
            }
        }
        
        if (await this.footer.exists()) {
            try {
                await this.footer.clickEcoNews();
                return;
            } catch {
                console.log('Footer click failed');
            }
        }
        
        await this.page.goto('/#/greenCity/news');
    }

    async clickCreateNews() {
        await this.ecoNewsComponent.clickCreateNews();
    }

    async clickEditNews() {
        await this.ecoNewsComponent.clickEditNews();
    }

    async getProfileName() {
        return (await this.header.nameProfile.textContent()) ?? '';
    }

    async getFirstNews() {
        return this.page.locator('li.gallery-view-li-active').first();
    }

    getNews() {
        return this.page.locator('li.gallery-view-li-active');
    }

}