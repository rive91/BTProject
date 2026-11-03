export class InventoryPage{
    //Constructor to initializae the webelements
    constructor(page){
        this.page = page;

        this.item1 = page.locator('[data-test = "add-to-cart-sauce-labs-backpack"]');
        this.item2 = page.locator('[data-test = "add-to-cart-sauce-labs-bike-light"]');
        this.cartButton = page.locator('[data-test = "shopping-cart-link"]');
    }

    async add2items(){
        await this.item1.click()
        await this.item2.click()
    }

     async clickCart(){
        await this.cartButton.click()
    }

}