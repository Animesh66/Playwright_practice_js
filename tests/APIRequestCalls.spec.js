const {test, expect, request} = require('@playwright/test');
const exp = require('constants');
const loginPayload = {userEmail: "anitest@email.com", userPassword: "Test12345678"};
let token;
test.beforeAll('Login to application', async () => {
    const apiRequest = await request.newContext();
    const loginResponse = await apiRequest.post(
        'https://rahulshettyacademy.com/api/ecom/auth/login',
        {data: loginPayload});
    expect(loginResponse.ok()).toBeTruthy();  // Verify reponse code is 2XX
    const reponseJson = await loginResponse.json(); // convert response to JSON
    token = reponseJson.token; // Get the token from the reponse JSON
    console.log(token);
})

test.only('Create Order', async ({browser}) => {
    const context = await browser.newContext();
    const page = await browser.newPage();
    await page.addInitScript(async (value) => {  // Setting the value of token in local storage
        window.localStorage.setItem('token', value);
    }, token);
    await page.goto('https://rahulshettyacademy.com/client/');
    await expect(page.getByRole('button', { name: 'HOME'})).toBeVisible();
})
