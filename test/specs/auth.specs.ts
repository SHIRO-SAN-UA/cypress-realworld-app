import { expect } from "@wdio/globals";
import { faker } from "@faker-js/faker";
import { $ } from "@wdio/globals";
import loginPage from "../pageobjects/login.page";
import homePage from "../pageobjects/home.page";
import signupPage from "../pageobjects/signup.page";

const randomFirstName = faker.person.firstName();
const randomLastName = faker.person.lastName();
const randomUsername = faker.internet.userName();
const randomPassword = faker.internet.password();
const randomPassword2 = randomPassword + "A";
const validUsername = "Katharina_Bernier";
const validPassword = "s3cret";
let body: any;

describe("User Sign-up Login and Logout", () => {
  beforeEach(async () => {
    // Allow clicking at non-interactive element of a page
    body = await $("body");
    // // Disable autocomplete before each test
    await browser.execute(() => {
      document.querySelectorAll("input").forEach((input) => {
        input.setAttribute("autocomplete", "off");
      });
    });
  });

  it("should redirect unauthenticated user to signin page", async () => {
    await browser.url(`${browser.options.baseUrl}personal`);
    expect(browser).toHaveUrl(`${browser.options.baseUrl}signin`);
  });

  it("should redirect to the home page after login", async () => {
    await browser.url(`${browser.options.baseUrl}signin`);
    await loginPage.login(validUsername, validPassword);
    expect(browser).toHaveUrl(`${browser.options.baseUrl}`);

    // Logout User
    await homePage.logoutButton.click();
    expect(browser).toHaveUrl(`${browser.options.baseUrl}signin`);
  });

  it("should allow a visitor to sign-up, login, and logout", async () => {
    // Sign-up User
    await browser.url(`${browser.options.baseUrl}signup`);
    await signupPage.signup(randomFirstName, randomLastName, randomUsername, randomPassword, randomPassword);
    expect(browser).toHaveUrl(`${browser.options.baseUrl}signin`);

    // Log-in User
    await loginPage.login(randomUsername, randomPassword);
    await homePage.popupNextButton.click();

    // Fill welcome popup window with random valid data
    const randomBankName = faker.string.sample(5);
    const randomRoutingNumber = faker.string.numeric(9);
    const randomAccountNumber = faker.string.numeric(9);
    await homePage.fillPopupWindowData(randomBankName, randomRoutingNumber, randomAccountNumber);
    await homePage.popupWindowDoneButton.click();
    expect(browser).toHaveUrl(`${browser.options.baseUrl}`);

    // Logout User
    await homePage.logoutButton.click();
    expect(browser).toHaveUrl(`${browser.options.baseUrl}signin`);
  });

  it("should display login errors", async () => {
    // Navigate to the login page
    await browser.url(`${browser.options.baseUrl}signin`);

    // Type in the username field and then clear it
    await loginPage.inputUsername.setValue(randomUsername);
    await loginPage.inputUsername.click(); // To ensure focus on the element
    await browser.keys(["Control", "a"]); // Or 'Meta' for Command on Mac
    await browser.keys("Delete");
    await loginPage.inputPassword.click();

    // Check for the username error message
    expect(await loginPage.usernameError).toBeDisplayed();
    expect(await loginPage.usernameError).toHaveText("Username is required");

    // Type in the password field and then clear it
    await loginPage.inputPassword.click();
    await loginPage.inputPassword.setValue("abc");
    await loginPage.inputPassword.clearValue();
    await body.click();

    // Check for the password error message
    expect(await loginPage.passwordError).toBeDisplayed();
    expect(await loginPage.passwordError).toHaveText("Password must contain at least 4 characters");

    // Check if the submit button is disabled
    expect(await loginPage.btnSubmit).toBeDisabled();
  });

  it("should display signup errors", async () => {
    await browser.url("/signup");
    await signupPage.inputFirstname.click();
    await body.click();
    expect(await signupPage.firstNameError).toBeDisplayed();
    expect(await signupPage.firstNameError).toHaveText("First Name is required");

    await signupPage.inputLastname.click();
    await body.click();
    expect(await signupPage.lastNameError).toBeDisplayed();
    expect(await signupPage.lastNameError).toHaveText("Last Name is required");

    await signupPage.inputUsername.click();
    await body.click();
    expect(await signupPage.usernameError).toBeDisplayed();
    expect(await signupPage.usernameError).toHaveText("Username is required");

    await signupPage.inputPassword.click();
    await body.click();
    expect(await signupPage.passwordError).toBeDisplayed();
    expect(await signupPage.passwordError).toHaveText("Enter your password");

    await signupPage.inputPassword.click();
    await signupPage.inputPassword.setValue(randomPassword);
    await signupPage.inputPasswordConfirm.click();
    await signupPage.inputPasswordConfirm.setValue(randomPassword2);
    expect(await signupPage.passwordMatchError).toBeDisplayed();
    expect(await signupPage.passwordMatchError).toHaveText("Password does not match");

    expect(await signupPage.signupButton).toBeDisabled();
  });

  it("should error for an invalid user", async () => {
    await loginPage.open();
    await loginPage.login(randomUsername, randomPassword2); // randomPassword was previously used to check signup!
    expect(await loginPage.userOrPasswordError).toBeDisplayed();
    expect(await loginPage.userOrPasswordError).toHaveText("Username or password is invalid");
  });

  it("should error for an invalid password for existing user", async () => {
    await loginPage.open();
    await loginPage.login(validUsername, randomPassword);
    expect(await loginPage.userOrPasswordError).toBeDisplayed();
    expect(await loginPage.userOrPasswordError).toBeDisplayed();
    expect(await loginPage.userOrPasswordError).toHaveText("Username or password is invalid");
  });
});
