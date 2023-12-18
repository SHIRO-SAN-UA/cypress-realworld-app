import { expect } from '@wdio/globals'
import { browser } from '@wdio/globals'


import LoginPage from '../pageobjects/login.page'
import SecurePage from '../pageobjects/secure.page'

describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        await LoginPage.open();

        // await browser.pause(5000);
    })
})

