const {test, expect, request} = require('@playwright/test');
const {APIUtils} = require('../utils/APIUtils');
const loginUrl = "https://rahulshettyacademy.com/api/ecom/auth/login";
const loginPayload = {userEmail: "anitest@email.com", userPassword: "Test12345678"};
const createOrderUrl = "https://rahulshettyacademy.com/api/ecom/order/create-order";
const getCustomerOrderUrl = "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*";
const createOrderPayload = {
    orders: [
        {
            country: "India",
            productOrderedId: "6262e95ae26b7e1a10e89bf0"
        }
    ]
};
let fakePayloadOrder = {data:[], message: "No Orders"};
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
    await page.route(getCustomerOrderUrl,
    async route => {  // This route will be call once the getCustomerOrderUrl endpoint is ht in the browser.
        const response = await page.request.fetch(route.request());  // This line is fetching the reposne of the provided endpoint.
        let body = JSON.stringify(fakePayloadOrder); // Sending the body as fake response when no orders will be dispensed. Also JSON.Stringfy will convert the JS object to a JSON file.
        route.fulfill( // fulfill will alter the response send to the brwoser.
            {
                response, // This is real response.
                body  // this body contains the fake body to simulate no order is present for the data.
            })
    })
    await page.getByRole('button', { name: 'ORDERS' }).click();
    await page.waitForResponse(getCustomerOrderUrl);  // Waiting for actual respose to come back from server before sending the fake reposne

})
