import { expect } from "@wdio/globals";
import loginPage from "../pageobjects/login.page";
import { faker } from "@faker-js/faker";
import homePage from "../pageobjects/home.page";
import myAccountPage from "../pageobjects/my.account.page";



describe("My Account page tests", () => {
  
 
  it("should display My Account helper texts", async () => {
    // Navigate to the login page, login with valid credentials and navigate to My Account
    await browser.url(`${browser.options.baseUrl}signin`);
    await loginPage.loginValid();
    await homePage.myAccountButton.click();

    await myAccountPage.clearAllFields();
    await expect(myAccountPage.firstNameHelper).toBeDisplayed();
    await expect(myAccountPage.firstNameHelper).toHaveText("Enter a first name");
    await expect(myAccountPage.lastNameHelper).toBeDisplayed();
    await expect(myAccountPage.lastNameHelper).toHaveText("Enter a last name");
    await expect(myAccountPage.emailHelper).toBeDisplayed();
    await expect(myAccountPage.emailHelper).toHaveText("Enter an email address");
    await expect(myAccountPage.phoneHelper).toBeDisplayed();
    await expect(myAccountPage.phoneHelper).toHaveText("Enter a phone number");
    await expect(myAccountPage.saveButton).toBeDisabled();
  });

  it("should display My Account input error messages", async () => {
    const invalidEmail = faker.string.sample(5);
    const invalidPhone = faker.string.numeric(5);

    // Type in invalid email and get error message
    await myAccountPage.clearAllFields();
    await (await myAccountPage.inputEmail).setValue(invalidEmail);
    await expect(myAccountPage.emailHelper).toBeDisplayed();
    await expect(myAccountPage.emailHelper).toHaveText("Must contain a valid email address");
    // Type in invalid phone and get error message
    await myAccountPage.clearAllFields();
    await myAccountPage.inputPhone.setValue(invalidPhone);
    await expect(myAccountPage.phoneHelper).toBeDisplayed();
    await expect(myAccountPage.phoneHelper).toHaveText("Phone number is not valid");
    await expect(myAccountPage.saveButton).toBeDisabled();
  });
});
