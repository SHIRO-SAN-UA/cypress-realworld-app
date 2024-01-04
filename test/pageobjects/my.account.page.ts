import { $ } from '@wdio/globals'
import Page from './page';


/**
 * sub page containing specific selectors and methods for a specific page
 */
class MyAccountPage extends Page {
    /**
     * define selectors using getter methods
     */
    public get inputFirstName () {
        return $('[data-test="user-settings-firstName-input"]');
    }

    public get inputLastName () {
        return $('[data-test="user-settings-lastName-input"]');
    }

    public get inputEmail () {
        return $('[data-test="user-settings-email-input"]');
    }

    public get inputPhone () {
        return $('[data-test="user-settings-phoneNumber-input"]');
    }

    public get saveButton () {
        return $('[data-test="user-settings-submit"]')
    }

    public get firstNameHelper() {
        return $('[id="user-settings-firstName-input-helper-text"]');
    }

    public get lastNameHelper() {
        return $('[id="user-settings-lastName-input-helper-text"]');
    }

    public get emailHelper() {
        return $('[id="user-settings-email-input-helper-text"]');
    }

    public get phoneHelper() {
        return $('[id="user-settings-phoneNumber-input-helper-text"]');
    }



    // Fill all fields and submit
    public async submitUserData (firstname: string, lastname: string, email: string, phone: string) {
        await this.inputFirstName.setValue(firstname);
        await this.inputLastName.setValue(lastname);
        await this.inputEmail.setValue(email);
        await this.inputPhone.setValue(phone);
        await this.saveButton.click();
    }

    // Clear all fields
    public async clearAllFields() {
        await this.inputFirstName.click();
        await browser.keys(["Control", "a"]); // Or 'Meta' for Command on Mac
        await browser.keys("Delete");
        await this.inputLastName.click();
        await browser.keys(["Control", "a"]); // Or 'Meta' for Command on Mac
        await browser.keys("Delete");
        await this.inputEmail.click();
        await browser.keys(["Control", "a"]); // Or 'Meta' for Command on Mac
        await browser.keys("Delete");
        await this.inputPhone.click();
        await browser.keys(["Control", "a"]); // Or 'Meta' for Command on Mac
        await browser.keys("Delete");
        
    }

}

export default new MyAccountPage();
