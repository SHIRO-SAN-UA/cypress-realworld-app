import { $ } from '@wdio/globals'
import Page from './page';


/**
 * sub page containing specific selectors and methods for a specific page
 */
class HomePage extends Page {
    /**
     * define selectors using getter methods
     */
    
    public get popupWelcomeWindow () {
        return $('[data-test="user-onboarding-dialog"]');
    }

    public get popupNextButton () {
        return $('[data-test="user-onboarding-next"]');
    }

    public get bankNameField () {
        return $('[id="bankaccount-bankName-input"]');
    }
   
    public get bankRoutingNumberField () {
        return $('[id="bankaccount-routingNumber-input"]');
    }
    public get accountNumberField () {
        return $('[id="bankaccount-accountNumber-input"]');
    }

    public get popupWindowSaveButton () {
        return $('[data-test="bankaccount-submit"]')
    }

    public get popupWindowDoneButton () {
        return $('[data-test="user-onboarding-next"]');
    }

    // Helper methods

    public async fillPopupWindowData(bankname: string, routingnumber: string, accountnumber: string) {
        await this.bankNameField.setValue(bankname);
        await this.bankRoutingNumberField.setValue(routingnumber);
        await this.accountNumberField.setValue(accountnumber);
        await this.popupWindowSaveButton.click();
    }

    public async logOut () {
        await this.logoutButton.click();
    }
    

    // Sidebar Menu selectors

    public get homeButton () {
        return $('[data-test="sidenav-home"]')
    }

    public get myAccountButton () {
        return $('[data-test="sidenav-user-settings"]');
    }

    public get bankAccountsButton () {
        return $('[data-test="sidenav-bankaccounts"]');
    }

    public get logoutButton () {
        return $('[data-test="sidenav-signout"]');
    }

    // Header elements

    public get newTransactionButton () {
        return $('[data-test="nav-top-new-transaction"]');
    }

    // Transaction elements

    public get transactionAmount () {
        return $('[data-test="transaction-create-amount-input"] [id="amount"]');
    } 
    
    public get transactionNote () {
        return $('[data-test="transaction-create-description-input"] [id="transaction-create-description-input"]');
    }

    public get transactionAmountHelper () {
        return $('[id="transaction-create-amount-input-helper-text"]');
    }

    public get transactionNoteHelper () {
        return $('[id="transaction-create-description-input-helper-text"]')
    }

    public get transactionRequestButton () {
        return $('[data-test="transaction-create-submit-request"]')
    }

    public get transactionPayButton () {
        return $('[data-test="transaction-create-submit-payment"]')
    }

    public get transactionDetails () {
        return $('.MuiGrid-justify-content-xs-center > div:nth-child(1) > h2:nth-child(1)');
    }

    public get returnToTransactions () {
        return $('[data-test="new-transaction-return-to-transactions"]')
    }
    
    public get transactionsList () {
        return $('[data-test="transaction-list"]');
    }

    public get makeAnotherTransaction () {
        return $('[data-test="new-transaction-create-another-transaction"]');
    }

    public get transactionDetailsHeader () {
        return $('[data-test="transaction-detail-header"]');
    }

    public get transactionComments () {
        return $('[data-test="comments-list"]');
    }
}

export default new HomePage();




