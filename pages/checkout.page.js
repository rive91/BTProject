export class CheckoutPage{
    //Constructor to initializae the webelements
    constructor(page){
        this.page = page;

        this.fn = page.locator('[data-test = "firstName"]');
        this.ln = page.locator('[data-test = "lastName"]');
        this.pc = page.locator('[data-test = "postalCode"]');
        this.continueButton = page.locator('[data-test = "continue"]');
        this.finishButton = page.locator('[data-test = "finish"]');
        this.completeHeader = page.locator('[data-test="complete-header"]');
    }

    async fillInformation(firstName, lastName, postalCode){
        await this.fn.fill(firstName)
        await this.ln.fill(lastName)
        await this.pc.fill(postalCode)
    }

    async clickContinue(){
        await this.continueButton.click();
    }

    async clickFinish(){
        await this.finishButton.click();
    }

    async getCompleteHeaderText() {
        return await this.completeHeader.textContent();
    }
}