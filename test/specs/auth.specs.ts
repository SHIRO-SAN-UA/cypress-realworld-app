import { expect } from "@wdio/globals";
import LoginPage from "../pageobjects/login.page";
import SignupPage from "../pageobjects/signup.page";
import { faker } from "@faker-js/faker";
import HomePage from "../pageobjects/home.page";
import { $ } from "@wdio/globals";

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
    await expect(browser).toHaveUrl(`${browser.options.baseUrl}signin`);
  });

  it("should redirect to the home page after login", async () => {
    await browser.url(`${browser.options.baseUrl}signin`);
    await LoginPage.login(validUsername, validPassword);
    await expect(browser).toHaveUrl(`${browser.options.baseUrl}`);

    // Logout User
    await HomePage.logoutButton.click();
    await expect(browser).toHaveUrl(`${browser.options.baseUrl}signin`);
  });

  it("should allow a visitor to sign-up, login, and logout", async () => {
    // Sign-up User
    await browser.url(`${browser.options.baseUrl}signup`);
    await SignupPage.signup(
      randomFirstName,
      randomLastName,
      randomUsername,
      randomPassword,
      randomPassword
    );
    await expect(browser).toHaveUrl(`${browser.options.baseUrl}signin`);

    // Log-in User
    await LoginPage.login(randomUsername, randomPassword);
    await HomePage.popupNextButton.click();

    // Fill welcome popup window with random valid data
    const randomBankName = faker.string.sample(5);
    const randomRoutingNumber = faker.string.numeric(9);
    const randomAccountNumber = faker.string.numeric(9);
    await HomePage.fillPopupWindowData(randomBankName, randomRoutingNumber, randomAccountNumber);
    await HomePage.popupWindowDoneButton.click();
    await expect(browser).toHaveUrl(`${browser.options.baseUrl}`);

    // Logout User
    await HomePage.logoutButton.click();
    await expect(browser).toHaveUrl(`${browser.options.baseUrl}signin`);
  });

  it("should display login errors", async () => {
    // Navigate to the login page
    await browser.url(`${browser.options.baseUrl}signin`);

    // Type in the username field and then clear it
    await LoginPage.inputUsername.setValue(randomUsername);
    await LoginPage.inputUsername.click(); // To ensure focus on the element
    await browser.keys(["Control", "a"]); // Or 'Meta' for Command on Mac
    await browser.keys("Delete");
    await LoginPage.inputPassword.click();

    // Check for the username error message
    await expect(LoginPage.usernameError).toBeDisplayed();
    await expect(LoginPage.usernameError).toHaveText("Username is required");

    // Type in the password field and then clear it
    await LoginPage.inputPassword.click();
    await LoginPage.inputPassword.setValue("abc");
    await LoginPage.inputPassword.clearValue();
    await body.click();

    // Check for the password error message
    await expect(LoginPage.passwordError).toBeDisplayed();
    await expect(LoginPage.passwordError).toHaveText("Password must contain at least 4 characters");

    // Check if the submit button is disabled
    await expect(LoginPage.btnSubmit).toBeDisabled();
  });

  it("should display signup errors", async () => {
    await browser.url("/signup");
    await SignupPage.inputFirstname.click();
    await body.click();
    await expect(SignupPage.firstNameError).toBeDisplayed();
    await expect(SignupPage.firstNameError).toHaveText("First Name is required");

    await SignupPage.inputLastname.click();
    await body.click();
    await expect(SignupPage.lastNameError).toBeDisplayed();
    await expect(SignupPage.lastNameError).toHaveText("Last Name is required");

    await SignupPage.inputUsername.click();
    await body.click();
    await expect(SignupPage.usernameError).toBeDisplayed();
    await expect(SignupPage.usernameError).toHaveText("Username is required");

    await SignupPage.inputPassword.click();
    await body.click();
    await expect(SignupPage.passwordError).toBeDisplayed();
    await expect(SignupPage.passwordError).toHaveText("Enter your password");

    await SignupPage.inputPassword.click();
    await SignupPage.inputPassword.setValue(randomPassword);
    await SignupPage.inputPasswordConfirm.click();
    await SignupPage.inputPasswordConfirm.setValue(randomPassword2);
    await expect(SignupPage.passwordMatchError).toBeDisplayed();
    await expect(SignupPage.passwordMatchError).toHaveText("Password does not match");

    await expect(SignupPage.signupButton).toBeDisabled();
  });

  it("should error for an invalid user", async () => {
    await LoginPage.open();
    await LoginPage.login(randomUsername, randomPassword2); // randomPassword was previously used to check signup!
    await expect(LoginPage.userOrPasswordError).toBeDisplayed();
    await expect(LoginPage.userOrPasswordError).toHaveText("Username or password is invalid");
  });

  it("should error for an invalid password for existing user", async () => {
    await LoginPage.open();
    await LoginPage.login(validUsername, randomPassword);
    await expect(LoginPage.userOrPasswordError).toBeDisplayed();
    await expect(LoginPage.userOrPasswordError).toBeDisplayed();
    await expect(LoginPage.userOrPasswordError).toHaveText("Username or password is invalid");
  });
});
