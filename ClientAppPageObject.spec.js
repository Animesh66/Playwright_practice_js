const {test, expect} = require('@playwright/test');
const {LoginPage} = require('../pageobjects/LoginPage');
const baseUrl = "https://rahulshettyacademy.com/client"
const userEmail = "anitest@email.com";
const userPassword = "Test12345678";

test.only('Client App Place Order', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const loginPage = new LoginPage(page);
    await loginPage.navigateUrl(baseUrl);
    await loginPage.perfromLogin(userEmail, userPassword);
    await expect(page.getByRole('button', { name: 'HOME'})).toBeVisible();
    await page.getByRole('button', { name: 'View' }).first().click();
    await expect(page.getByRole('link', { name: 'Continue Shopping'})).toBeVisible();
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'Add to Cart'}).click();
    await page.getByRole('button', { name: 'Cart' }).first().click();
    await page.getByRole('button', { name: 'Checkout' }).click();
    await page.locator('input[type="text"]').nth(1).fill('123');
    await page.locator('input[type="text"]').nth(2).fill('test');
    await page.getByPlaceholder('Select Country').type('india', {delay: 500});
    const countryDropdowns = await page.locator(".ta-item");
    await countryDropdowns.nth(1).click();
    await page.getByText('Place Order').click();
    await expect(page.locator('.hero-primary')).toHaveText("Thankyou for the order.");
    const orderId = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
    console.log(`${orderId}`);
    await page.getByRole('button', { name: 'ORDERS' }).click();
    await page.locator('tbody').waitFor();
    const orderRows = await page.locator("tbody tr");
    const rowCount = await orderRows.count();
    console.log(rowCount);
    for (let i=0; i < rowCount; ++i){
        const expectOrderId = await orderRows.nth(i).locator("th").textContent();
        console.log(expectOrderId);
        if (orderId.includes(expectOrderId)){
            await orderRows.nth(i).getByRole('button', { name: 'View'}).click();
            break;
        }        
    }
    const actualOrderId = await page.locator('.col-text').textContent();
    expect(orderId.includes(actualOrderId)).toBeTruthy();
})
