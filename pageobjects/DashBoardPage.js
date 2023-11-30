export class DashBoardPage{
    constructor(page){
        this.page = page;
        this.homeButton = page.getByRole('button', { name: 'HOME'});
        this.viewproductButton = page.getByRole('button', { name: 'View' });
        this.addCartButton = page.getByRole('button', { name: 'Add to Cart'});
        this.cartButton = page.getByRole('button', { name: 'Cart' });
        this.productTable = page.locator("tbody tr");
    }
    async selectProductToCart(){

    }
    async searchProduct(){
        const orderRows = await this.productTable;
        const rowCount = await orderRows.count();
        for (let i=0; i < rowCount; ++i){
            const expectOrderId = await orderRows.nth(i).locator("th").textContent();
            console.log(expectOrderId);
            if (orderId.includes(expectOrderId)){
            await orderRows.nth(i).getByRole('button', { name: 'View'}).click();
            break;
            }        
        }
    }
}
