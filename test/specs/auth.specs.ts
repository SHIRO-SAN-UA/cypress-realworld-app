import { expect } from '@wdio/globals';
import loginPage from '../pageobjects/login.page';

describe('User Sign-up and Login', () => {
    it('should redirect unauthenticated user to signin page', async () => {
        await browser.url(`${browser.options.baseUrl}/personal`);
        await expect(browser).toHaveUrl(`${browser.options.baseUrl}/signin`);
    });

    it('should redirect to the home page after login', async () => {
        await browser.url(`${browser.options.baseUrl}/signin`);
        await loginPage.login('Katharina_Bernier', 's3cret');
        await expect(browser).toHaveUrl(`${browser.options.baseUrl}/`);
    });
});
