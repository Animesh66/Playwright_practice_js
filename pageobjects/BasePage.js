import { DashBoardPage } from "./DashBoardPage";
import { LoginPage } from "./LoginPage";

export class BasePage{
    
    constructor(page){
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashBoardPage = new DashBoardPage(this.page);
    }
    getLoginPage() {
        return this.loginPage;
    }
    getDashboardPage() {
        return this.dashBoardPage;
    }

}
