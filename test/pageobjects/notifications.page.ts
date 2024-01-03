import { $ } from '@wdio/globals'
import Page from './page';


/**
 * sub page containing specific selectors and methods for a specific page
 */
class NotificationsPage extends Page {
    /**
     * define selectors using getter methods
     */
    public get inputFirstName () {
        return $('[data-test="user-settings-firstName-input"]');
    }

   


   

}

export default new NotificationsPage();
