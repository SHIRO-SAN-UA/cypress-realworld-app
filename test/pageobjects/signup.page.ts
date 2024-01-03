import { $ } from '@wdio/globals'
import Page from './page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    public get inputFirstname () {
        return $('#firstName');
    }

    public get inputLastname () {
        return $('#lastName');
    }

    public get inputUsername () {
        return $('#username');
    }

    public get inputPassword () {
        return $('#password');
    }

    public get inputPasswordConfirm () {
        return $('#confirmPassword');
    }

    public get signupButton () {
        return $('[data-test="signup-submit"]');
    }

    public async signup (firstname: string, lastname: string, username: string, password: string, passwordconfirm: string) {
        await this.inputFirstname.setValue(firstname);
        await this.inputLastname.setValue(lastname);
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.inputPasswordConfirm.setValue(passwordconfirm);
        await this.signupButton.click();
    }

    public get firstNameError () {
        return $('[id="firstName-helper-text"]');
    }

    public get lastNameError () {
        return $('[id="lastName-helper-text"]');
    }

    public get usernameError () {
        return $('[id="username-helper-text"]');
    }

    public get passwordError () {
        return $('[id="password-helper-text"]');
    }

    public get passwordMatchError () {
        return $('[id="confirmPassword-helper-text"]');
    }
}


export default new LoginPage();