const {test, expect, request} = require('@playwright/test');
const {APIUtils} = require('./utils/APIUtils');
const loginUrl = "https://rahulshettyacademy.com/api/ecom/auth/login";
const loginPayload = {userEmail: "anitest@email.com", userPassword: "Test12345678"};
const createOrderUrl = "https://rahulshettyacademy.com/api/ecom/order/create-order";
const createOrderPayload = {
    orders: [
        {
            country: "India",
            productOrderedId: "6262e95ae26b7e1a10e89bf0"
        }
    ]
};
let token;
let orderId;

test.beforeAll('Login to application', async () => {
    const apiRequest = await request.newContext();
    const apiUtils = new APIUtils(apiRequest, loginUrl, loginPayload);
    token = await apiUtils.getToken();
    orderId = await apiUtils.createOrder(createOrderUrl, createOrderPayload)

})

test.only('Create Orders', async ({page}) => {
    await page.addInitScript(async (value) => {  // Setting the value of token in local storage
        window.localStorage.setItem('token', value);
    }, token);
    await page.goto('https://rahulshettyacademy.com/client/');
    await expect(page.getByRole('button', { name: 'HOME'})).toBeVisible();
    await page.getByRole('button', { name: 'ORDERS' }).click();
    await page.locator('tbody').waitFor();
    const orderRows = await page.locator("tbody tr");
    const rowCount = await orderRows.count();
    for (let i=0; i < rowCount; ++i){
        const expectOrderId = await orderRows.nth(i).locator("th").textContent();
        if (orderId.includes(expectOrderId)){
            await orderRows.nth(i).getByRole('button', { name: 'View'}).click();
            break;
        }        
    }
    const actualOrderId = await page.locator('.col-text').textContent();
    expect(orderId.includes(actualOrderId)).toBeTruthy();
})
