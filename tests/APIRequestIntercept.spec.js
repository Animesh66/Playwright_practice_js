const {test, expect, request} = require('@playwright/test');
const {APIUtils} = require('./utils/APIUtils');
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
    await page.addInitScript(async (value) => {  // Setting the value of token in local storage
        window.localStorage.setItem('token', value);
    }, token);
    await page.goto('https://rahulshettyacademy.com/client/');
    await expect(page.getByRole('button', { name: 'HOME'})).toBeVisible();
    await page.getByRole('button', { name: 'ORDERS' }).click();
    
    await page.route(getOrderDetailsUrl,
    async route => {  // This route will be call once the getCustomerOrderUrl endpoint is hit in the browser.
        route.continue( // Send the modified url to the server.
            {
                url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=65679b079fd99c85e8db49bf"
            })
    })
    await page.getByRole('button', { name: 'View'}).first().click();
    await page.pause();
})
