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
    expect(await myAccountPage.firstNameHelper).toBeDisplayed();
    expect(await myAccountPage.firstNameHelper).toHaveText("Enter a first name");
    expect(await myAccountPage.lastNameHelper).toBeDisplayed();
    expect(await myAccountPage.lastNameHelper).toHaveText("Enter a last name");
    expect(await myAccountPage.emailHelper).toBeDisplayed();
    expect(await myAccountPage.emailHelper).toHaveText("Enter an email address");
    expect(await myAccountPage.phoneHelper).toBeDisplayed();
    expect(await myAccountPage.phoneHelper).toHaveText("Enter a phone number");
    expect(await myAccountPage.saveButton).toBeDisabled();
  });

  it("should display My Account input error messages", async () => {
    const invalidEmail = faker.string.sample(5);
    const invalidPhone = faker.string.numeric(5);

    // Type in invalid email and get error message
    await myAccountPage.clearAllFields();
    await (await myAccountPage.inputEmail).setValue(invalidEmail);
    expect(await myAccountPage.emailHelper).toBeDisplayed();
    expect(await myAccountPage.emailHelper).toHaveText("Must contain a valid email address");
    // Type in invalid phone and get error message
    await myAccountPage.clearAllFields();
    await myAccountPage.inputPhone.setValue(invalidPhone);
    expect(await myAccountPage.phoneHelper).toBeDisplayed();
    expect(await myAccountPage.phoneHelper).toHaveText("Phone number is not valid");
    expect(await myAccountPage.saveButton).toBeDisabled();
  });
});
