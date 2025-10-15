import { type Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async enterUserName(username: string) {
        await this.page.locator('#username').fill(username);
    }

    async enterPassword(password: string) {
        await this.page.locator('#password').fill(password);
    }

    async clickSignInButton() {
        await this.page.getByRole('button', { name: 'Sign in' }).click();
    }

    async logIntoAccount(username: string, password: string) {
        await this.enterUserName(username);
        await this.enterPassword(password);
        await this.clickSignInButton();
    }
}