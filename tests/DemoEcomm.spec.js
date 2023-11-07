const { test, expect } = require('@playwright/test');

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
    await expect(page.getByRole('button', {name: 'Login'})).toBeVisible();
})

test.only('Verify login successful', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await expect(page).toHaveTitle("Let's Shop");
    await page.getByRole('textbox', { name: 'Email' }).fill("anitest@email.com");
    await page.getByPlaceholder('enter your passsword').fill('Test12345678');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByRole('button', {name: ' HOME '})).toBeVisible();
    await page.getByRole('button', { name: ' View' }).first().click();
    await expect(page.getByRole('link', {name: 'Continue Shopping'})).toBeVisible();
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', {name: 'Add to Cart'}).click();
    await page.getByRole('button', { name: ' Cart 1' }).click();
    await page.getByRole('button', { name: 'Checkout❯' }).click();
})
