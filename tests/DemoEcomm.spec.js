const { test, expect } = require('@playwright/test');

test.only('Verify order placed with order id', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await expect(page).toHaveTitle("Let's Shop");
    await page.getByRole('link', { name: 'Register' }).click();
})