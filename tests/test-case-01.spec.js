import {test,expect} from '@playwright/test';
import { LoginPage } from '../pages/login.page.js';
import { InventoryPage } from '../pages/inventory.page.js';
import { CartPage } from '../pages/cart.page.js';
import { CheckoutPage } from '../pages/checkout.page.js';

test('Test Case 01', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    //Step 1 Login
    await loginPage.goto();

    await loginPage.login('standard_user','secret_sauce')

    //Step 2 Inventory Page - add to 2 items
    await inventoryPage.add2items()
    await inventoryPage.clickCart()

    //Step 3. Cart Verification
    await cartPage.validateTextItemsInCart('Sauce Labs Backpack','Sauce Labs Bike Light')
    await cartPage.clickcheckoutButton()

    //Step 4 Checkout Flow
    await checkoutPage.fillInformation("Test","Automation","90210")
    await checkoutPage.clickContinue()
    await checkoutPage.clickFinish()

    //Step 5 verification
    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
})