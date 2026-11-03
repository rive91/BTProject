import {expect} from '@playwright/test';

export class CartPage{
    //Constructor to initializae the webelements
    constructor(page){
        this.page = page;
        this.checkoutButton = page.locator('[data-test = "checkout"]');
        this.item1 = page.locator('[data-test = "item-4-title-link"]');
        this.item2 = page.locator('[data-test = "item-0-title-link"]');

    }

    async clickcheckoutButton(){
        await this.checkoutButton.click()
    }


    async validateTextItemsInCart(expectedItem1, expectedItem2) {
        await expect(this.item1).toHaveText(expectedItem1);
        await expect(this.item2).toHaveText(expectedItem2);
    }

}