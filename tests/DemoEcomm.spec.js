const { test, expect } = require('@playwright/test');

test.only('Verify order placed with order id', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await expect(page).toHaveTitle("Let's Shop");
    await page.getByRole('link', { name: 'Register' }).click();
    await page.getByRole('textbox', { name: 'First Name' }).fill("Animesh");
    await page.getByRole('textbox', { name: 'Last Name' }).fill("Mukherjee");
    await page.getByRole('textbox', { name: 'Email' }).fill("anitest@email.com");
    await page.getByPlaceholder('enter your number').fill('0123456789');
    await page.getByRole('combobox').selectOption('3: Engineer');
    await page.getByLabel('Male', { exact: true }).check();
    await page.getByPlaceholder('Passsword', { exact: true }).fill('Test@123');
    await page.getByPlaceholder('Confirm Passsword').fill('Test@123');
    await page.getByRole('checkbox').check();
    await page.getByRole('button', { name: 'Register' }).click();
})
