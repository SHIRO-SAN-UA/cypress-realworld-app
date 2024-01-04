import { expect } from "@wdio/globals";
import loginPage from "../pageobjects/login.page";
import { faker } from "@faker-js/faker";
import homePage from "../pageobjects/home.page";
import { $ } from "@wdio/globals";
import bankAccountsPage from "../pageobjects/bank.accounts,page";

let body: any;

describe("Managing Bank accounts", () => {
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

  it("Should allow to create a new Bank Account", async () => {
    // Log in and navigate to Bank Accounts page
    await browser.url(`${browser.options.baseUrl}`);
    await loginPage.loginValid();
    await homePage.bankAccountsButton.click();
    await bankAccountsPage.createButton.click();
    expect(await browser.getUrl()).toEqual(`${browser.options.baseUrl}bankaccounts/new`);

    // Fill Bank accounts window with random valid data and submit
    const randomBankName = faker.string.sample(5);
    const randomRoutingNumber = faker.string.numeric(9);
    const randomAccountNumber = faker.string.numeric(9);
    await bankAccountsPage.fillBankData(randomBankName, randomRoutingNumber, randomAccountNumber);
    expect(await browser.getUrl()).toEqual(`${browser.options.baseUrl}bankaccounts`);
  });

  it("Should allow to delete an existing Bank Account", async () => {
    await browser.url(`${browser.options.baseUrl}bankaccounts`);
    await expect(bankAccountsPage.accountListFirstItem).toBeDisplayed();

    const deleteButtons = await $$(
      '[data-test^="bankaccount-list-item-"] [data-test="bankaccount-delete"]'
    );
    if (deleteButtons.length > 0) {
      await deleteButtons[0].click();

      // Wait for the UI to update after deletion
      await browser.pause(1000);

      // Check for the '(Deleted)' text in the first item
      const firstItemText = await $$(
        '[data-test^="bankaccount-list-item-"] p.MuiTypography-body1'
      )[0].getText();
      expect(firstItemText).toContain("(Deleted)");
    } else {
      throw new Error("No delete buttons found");
    }
  });

  it("Should display helper messages, when creating new Bank Account", async () => {
    await browser.url(`${browser.options.baseUrl}bankaccounts`);
    await bankAccountsPage.createButton.click();
    await bankAccountsPage.bankNameField.click();
    await bankAccountsPage.bankRoutingNumberField.click();
    await bankAccountsPage.accountNumberField.click();
    await body.click();

    await expect(bankAccountsPage.bankNameHelper).toHaveText("Enter a bank name");
    await expect(bankAccountsPage.routingNumberHelper).toHaveText(
      "Enter a valid bank routing number"
    );
    await expect(bankAccountsPage.accountNumberHelper).toHaveText(
      "Enter a valid bank account number"
    );

    // Log out
    await homePage.logoutButton.click();
  });
});
