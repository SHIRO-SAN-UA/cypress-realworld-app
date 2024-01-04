import { expect } from "@wdio/globals";
import loginPage from "../pageobjects/login.page";
import homePage from "../pageobjects/home.page";
import { faker } from "@faker-js/faker";

describe("Transactions", () => {
  beforeEach(async () => {
    // Navigate to the login page and login before each test
    await browser.url(`${browser.options.baseUrl}signin`);
    await loginPage.loginValid();
  });

  afterEach(async () => {
    // Logout after each test
    await homePage.logOut();
  });

  it("should allow making new payment", async () => {
    // Navigate to create new transaction
    await homePage.newTransactionButton.click();
    expect(await browser.getUrl()).toEqual(`${browser.options.baseUrl}transaction/new`);

    // Select a user for the transaction
    let userItems = await $$('[data-test^="user-list-item-"]');
    if (userItems.length > 0) {
      let firstUserItem = userItems[0];
      await firstUserItem.click(); // Select the first user
    } else {
      throw new Error("No user items found in the list");
    }

    // Set transaction amount and note
    let randomAmount = faker.number.int({ min: 1, max: 10 });
    let randomNote = faker.lorem.sentence();
    await homePage.transactionAmount.click();
    await homePage.transactionAmount.setValue(randomAmount);
    await homePage.transactionNote.click();
    await homePage.transactionNote.setValue(randomNote);

    // Submit the transaction
    await homePage.transactionPayButton.click();

    // Check if amount and note match the expected values
    let expectedAmount = randomAmount.toFixed(2);
    let expectedNote = randomNote;
    let transactionDetailsText = await homePage.transactionDetails.getText();
    expect(transactionDetailsText).toContain(`Paid $${expectedAmount} for ${expectedNote}`);
  });

  it("should allow to return to transactions list after making payment", async () => {
    // Navigate to create new transaction
    await homePage.newTransactionButton.click();
    expect(await browser.getUrl()).toEqual(`${browser.options.baseUrl}transaction/new`);

    // Select a user for the transaction
    let userItems = await $$('[data-test^="user-list-item-"]');
    if (userItems.length > 0) {
      let firstUserItem = userItems[0];
      await firstUserItem.click(); // Select the first user
    } else {
      throw new Error("No user items found in the list");
    }

    // Set transaction amount and note
    let randomAmount = faker.number.int({ min: 1, max: 10 });
    let randomNote = faker.lorem.sentence();
    await homePage.transactionAmount.click();
    await homePage.transactionAmount.setValue(randomAmount);
    await homePage.transactionNote.click();
    await homePage.transactionNote.setValue(randomNote);

    // Submit the transaction
    await homePage.transactionPayButton.click();

    // Return to transactions list
    await homePage.returnToTransactions.click();
    expect(await homePage.transactionsList).toBeDisplayed();
    expect(await browser.getUrl()).toEqual(`${browser.options.baseUrl}`);
  });

  it("should allow making another payment right away", async () => {
    // Navigate to create new transaction
    await homePage.newTransactionButton.click();
    expect(await browser.getUrl()).toEqual(`${browser.options.baseUrl}transaction/new`);

    // Select a user for the transaction
    let userItems = await $$('[data-test^="user-list-item-"]');
    if (userItems.length > 0) {
      let firstUserItem = userItems[0];
      await firstUserItem.click(); // Select the first user
    } else {
      throw new Error("No user items found in the list");
    }

    // Set transaction amount and note
    let randomAmount = faker.number.int({ min: 1, max: 10 });
    let randomNote = faker.lorem.sentence();
    await homePage.transactionAmount.click();
    await homePage.transactionAmount.setValue(randomAmount);
    await homePage.transactionNote.click();
    await homePage.transactionNote.setValue(randomNote);

    // Submit the transaction
    await homePage.transactionPayButton.click();

    // Return to transactions list
    await homePage.makeAnotherTransaction.click();

    // Select a user for the transaction
    let userItemsNew = await $$('[data-test^="user-list-item-"]');
    if (userItemsNew.length > 0) {
      let firstUserItem = userItemsNew[0];
      await firstUserItem.click(); // Select the first user
    } else {
      throw new Error("No user items found in the list");
    }

    // Set transaction amount and note
    let randomAmountNew = faker.number.int({ min: 1, max: 10 });
    let randomNoteNew = faker.lorem.sentence();
    await homePage.transactionAmount.click();
    await homePage.transactionAmount.setValue(randomAmountNew);
    await homePage.transactionNote.click();
    await homePage.transactionNote.setValue(randomNoteNew);

    // Submit the transaction
    await homePage.transactionPayButton.click();

    // Check if amount and note match the expected values
    let expectedAmount = randomAmountNew.toFixed(2);
    let expectedNote = randomNoteNew;
    let transactionDetailsText = await homePage.transactionDetails.getText();
    expect(transactionDetailsText).toContain(`Paid $${expectedAmount} for ${expectedNote}`);
  });

  it("should allow making new payment request", async () => {
    // Navigate to create new transaction
    await homePage.newTransactionButton.click();
    expect(await browser.getUrl()).toEqual(`${browser.options.baseUrl}transaction/new`);

    // Select a user for the transaction
    let userItems = await $$('[data-test^="user-list-item-"]');
    if (userItems.length > 0) {
      let firstUserItem = userItems[0];
      await firstUserItem.click(); // Select the first user
    } else {
      throw new Error("No user items found in the list");
    }

    // Set transaction amount and note
    let randomAmount = faker.number.int({ min: 1, max: 10 });
    let randomNote = faker.lorem.sentence();
    await homePage.transactionAmount.click();
    await homePage.transactionAmount.setValue(randomAmount);
    await homePage.transactionNote.click();
    await homePage.transactionNote.setValue(randomNote);

    // Request the transaction
    await homePage.transactionRequestButton.click();

    // Check if amount and note match the expected values
    let expectedAmount = randomAmount.toFixed(2);
    let expectedNote = randomNote;
    let transactionDetailsText = await homePage.transactionDetails.getText();
    expect(transactionDetailsText).toContain(`Requested $${expectedAmount} for ${expectedNote}`);
  });

  it("should display helper messages for Amount and Note input fields", async () => {
    // Navigate to create new transaction
    await homePage.newTransactionButton.click();
    expect(await browser.getUrl()).toEqual(`${browser.options.baseUrl}transaction/new`);

    // Select a user for the transaction
    let userItems = await $$('[data-test^="user-list-item-"]');
    if (userItems.length > 0) {
      let firstUserItem = userItems[0];
      await firstUserItem.click(); // Select the first user
    } else {
      throw new Error("No user items found in the list");
    }

    // Set transaction amount and note

    await homePage.transactionAmount.click();
    await homePage.transactionAmount.clearValue();
    expect(await homePage.transactionAmountHelper).toHaveText("Please enter a valid amount");
    await homePage.transactionNote.click();
    await homePage.transactionNote.clearValue();
    expect(await homePage.transactionNoteHelper).toHaveText("Please enter a note");
  });

  it("should display Transactions list", async () => {
    // Navigate to Home
    await homePage.homeButton.click();
    expect(await homePage.transactionsList).toBeDisplayed();
  });

  it("should display Transaction detail", async () => {
    // Navigate to Home
    await homePage.homeButton.click();

    // Select a transaction
    let transactionItems = await $$('[data-test^="transaction-item-"]');
    if (transactionItems.length > 0) {
      let firstTransactionItem = transactionItems[0];
      await firstTransactionItem.click(); // Select the first transaction in the list
    } else {
      throw new Error("No user items found in the list");
    }
    expect(await homePage.transactionDetails).toBeDisplayed();
    expect(await homePage.transactionDetails).toHaveText("Transaction Detail");
  });

  it("should allow to comment Transaction", async () => {
    // Navigate to Home
    await homePage.homeButton.click();

    // Select a transaction
    let transactionItems = await $$('[data-test^="transaction-item-"]');
    if (transactionItems.length > 0) {
      let firstTransactionItem = transactionItems[0];
      await firstTransactionItem.click(); // Select the first transaction in the list
    } else {
      throw new Error("No user items found in the list");
    }
    let randomComment = faker.word.adjective();
    let transactionCommentField = await $$('[data-test^="transaction-comment-input-"]');
    let transactionCommentInput = transactionCommentField[0];
    await transactionCommentInput.setValue(randomComment);
    await browser.keys('Enter');
    expect(await homePage.transactionComments).toBeDisplayed();

  });
});
