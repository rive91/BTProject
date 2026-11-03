export class LoginPage{
    //Constructor to initializae the webelements
    constructor(page){
        this.page = page;

        this.userNameInput = page.locator('[data-test = "username"]');
        this.userPwdInput = page.locator('[data-test = "password"]');
        this.loginButton = page.locator('[data-test = "login-button"]');
    }

    async goto(){
        await this.page.goto('https://www.saucedemo.com/')
    }

    async login(username, password){
        await this.userNameInput.fill(username)
        await this.userPwdInput.fill(password)
        await this.loginButton.click()
    }

}