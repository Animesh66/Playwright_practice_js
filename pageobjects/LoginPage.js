export class LoginPage {

    constructor(page){
        this.page = page;
        this.userEmailBox = page.getByRole('textbox', { name: 'Email' });
        this.userPasswordBox = page.getByPlaceholder('enter your passsword');
        this.LoginPageButton = page.getByRole('button', { name: 'Login' });
    }
    async navigateUrl(baseUrl){
        await this.page.goto(baseUrl);
    }

    async perfromLogin(userEmail, userPassword){
        await this.userEmailBox.fill(userEmail);
        await this.userPasswordBox.fill(userPassword);
        await this.LoginPageButton.click();
        await this.page.waitForLoadState('networkidle');
    }

}
