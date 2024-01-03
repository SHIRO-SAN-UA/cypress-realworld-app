import { $ } from '@wdio/globals'
import Page from './page';


/**
 * sub page containing specific selectors and methods for a specific page
 */
class BankAccounstPage extends Page {
    /**
     * define selectors using getter methods
     */
    public get createButton () {
        return $('[data-test="bankaccount-new"]');
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

    public get saveButton () {
        return $('[data-test="bankaccount-submit"]');
    }

    public get bankNameHelper () {
        return $('[id="bankaccount-bankName-input-helper-text"]');
    }

    public get routingNumberHelper () {
        return $('[id="bankaccount-routingNumber-input-helper-text"]');
    }

    public get accountNumberHelper () {
        return $('[id="bankaccount-accountNumber-input-helper-text"]');
    }

    public get accountListFirstItem () {
        return $$('[data-test^="bankaccount-list-item-"]')[0];
    }

    public get deleteAccountButton () {
        return $('[data-test="bankaccount-delete"]');
    }

    public async fillBankData(bankname: string, routingnumber: string, accountnumber: string) {
        await this.bankNameField.setValue(bankname);
        await this.bankRoutingNumberField.setValue(routingnumber);
        await this.accountNumberField.setValue(accountnumber);
        await this.saveButton.click();
    }
  

}

export default new BankAccounstPage();
