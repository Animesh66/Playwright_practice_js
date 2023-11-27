const {test, expect, request} = require('@playwright/test');
const exp = require('constants');
const loginUrl ='https://rahulshettyacademy.com/api/ecom/auth/login';
const loginPayload = {userEmail: "anitest@email.com", userPassword: "Test12345678"};
const createOrderUrl = 'https://rahulshettyacademy.com/api/ecom/order/create-order';
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
    const loginResponse = await apiRequest.post(
        loginUrl,
        {data: loginPayload});
    expect(loginResponse.ok()).toBeTruthy();  // Verify reponse code is 2XX
    const reponseJson = await loginResponse.json(); // convert response to JSON
    token = reponseJson.token; // Get the token from the reponse JSON
    console.log(token);
    const orderResponse = await apiRequest.post(createOrderUrl,
        {
            data: createOrderPayload,
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });
    const orderResponseJson = await orderResponse.json();
    orderId = orderResponseJson.orders[0];
    console.log(orderId);
})

test('Vaidate Home Page', async ({browser}) => {
    const context = await browser.newContext();
    const page = await browser.newPage();
    await page.addInitScript(async (value) => {  // Setting the value of token in local storage
        window.localStorage.setItem('token', value);
    }, token);
    await page.goto('https://rahulshettyacademy.com/client/');
    await expect(page.getByRole('button', { name: 'HOME'})).toBeVisible();
})

test.only('Create Orders', async ({browser}) => {
    const context = await browser.newContext();
    const page = await browser.newPage();
    await page.addInitScript(async (value) => {  // Setting the value of token in local storage
        window.localStorage.setItem('token', value);
    }, token);
    await page.goto('https://rahulshettyacademy.com/client/');
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
