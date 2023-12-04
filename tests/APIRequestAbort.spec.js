const {test, expect, request} = require('@playwright/test');
const {APIUtils} = require('../utils/APIUtils');
const loginUrl = "https://rahulshettyacademy.com/api/ecom/auth/login";
const loginPayload = {userEmail: "anitest@email.com", userPassword: "Test12345678"};
const createOrderUrl = "https://rahulshettyacademy.com/api/ecom/order/create-order";
const getCustomerOrderUrl = "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*";
const getOrderDetailsUrl = "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*";
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
    page.on('request', request => console.log(request.url())); // This will listen to events and print requests in console.
    page.on('response', response => console.log(response.url(), response.status()));  // This will listen to response events and print the response url and the status code in console.
    await page.addInitScript(async (value) => {  // Setting the value of token in local storage
        window.localStorage.setItem('token', value);
    }, token);
    await page.goto('https://rahulshettyacademy.com/client/');
    await page.route('**/*.{jpg,png,jpeg}', route => route.abort()); // Block all the request with .jpg, .png, .jpeg extension.
    await expect(page.getByRole('button', { name: 'HOME'})).toBeVisible();
    await page.getByRole('button', { name: 'ORDERS' }).click();
    await page.locator('tbody').waitFor();
    await page.getByRole('button', { name: 'View'}).first().click();
    await page.pause();
})
