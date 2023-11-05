const { test, expect } = require('@playwright/test');

test.only('Verify order placed with order id', async (browser) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/auth/login");
    await expect(page).toHaveTitle("Let's Stop");
    await page.getByRole("button", { name: 'Register' }).click();
})