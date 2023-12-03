const { test, expect } = require('@playwright/test');
const exp = require('constants');
const loginData = JSON.parse(JSON.stringify(require('../testData/loginData.json')));  // This will first converts the json file to a string using stringfy then parse will convert the string to js object.

test('Verify new user registration successful', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await expect(page).toHaveTitle("Let's Shop");
    await page.getByRole('link', { name: 'Register' }).click();
    await page.getByRole('textbox', { name: 'First Name' }).fill("Animesh");
    await page.getByRole('textbox', { name: 'Last Name' }).fill("Mukherjee");
    await page.getByRole('textbox', { name: 'Email' }).fill("anitest@email.com");
    await page.getByPlaceholder('enter your number').fill('9093624381');
    await page.getByRole('combobox').selectOption('3: Engineer');
    await page.getByLabel('Male', { exact: true }).check();
    await page.getByPlaceholder('Passsword', { exact: true }).fill('Test12345678');
    await page.getByPlaceholder('Confirm Passsword').fill('Test12345678');
    await page.getByRole('checkbox').check();
    await page.getByRole('button', { name: 'Register' }).click();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
})

test.only('Verify order placed', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await expect(page).toHaveTitle("Let's Shop");
    await page.getByRole('textbox', { name: 'Email' }).fill(loginData.userEmail);
    await page.getByPlaceholder('enter your passsword').fill(loginData.password);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByRole('button', { name: 'HOME' })).toBeVisible();
    await page.getByRole('button', { name: 'View' }).first().click();
    await expect(page.getByRole('link', { name: 'Continue Shopping' })).toBeVisible();
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'Add to Cart' }).click();
    await page.getByRole('button', { name: 'Cart' }).first().click();
    await page.getByRole('button', { name: 'Checkout' }).click();
    await page.locator('input[type="text"]').nth(1).fill('123');
    await page.locator('input[type="text"]').nth(2).fill('test');
    await page.getByPlaceholder('Select Country').type('india', { delay: 500 });
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
    for (let i = 0; i < rowCount; ++i) {
        const expectOrderId = await orderRows.nth(i).locator("th").textContent();
        console.log(expectOrderId);
        if (orderId.includes(expectOrderId)) {
            await orderRows.nth(i).getByRole('button', { name: 'View' }).click();
            break;
        }
    }
    const actualOrderId = await page.locator('.col-text').textContent();
    expect(orderId.includes(actualOrderId)).toBeTruthy();
})
