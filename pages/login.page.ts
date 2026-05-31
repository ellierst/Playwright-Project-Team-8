import { Page, Locator } from '@playwright/test';
import { Header } from '../components/header.component';
import { LoginModal } from '../components/login.modal';

export class LoginPage {
    private readonly page: Page;
    private readonly header: Header;
    private readonly loginModal: LoginModal;
    private readonly userHeader: Locator;

    constructor(page: Page) {
        this.page = page;
        this.header = new Header(page);
        this.loginModal = new LoginModal(page);
        this.userHeader = page.locator('#header_user-wrp');
    }

    async login(email: string, password: string): Promise<void> {
        await this.header.clickSignIn();
        
        await this.loginModal.waitForVisible();
        
        await this.loginModal.login(email, password);
    }

    async isLoggedIn(): Promise<boolean> {
        try {
            await this.userHeader.waitFor({ state: 'visible', timeout: 5000 });
            return true;
        } catch {
            return false;
        }
    }
}