const { test, expect } = require('@playwright/test');
const { assert } = require('console');

test.describe.configure({ mode: 'parallel' });  // This decorator will run all other tests in parallel in this file.
test('@web Browser context test', async ({ browser }) => {  // @web is a tag to run specific tests at a time.
    // playwright code
    // Crete a new instance of the browser is context(incognito)
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://demowebshop.tricentis.com/');
    console.log(await page.title());
    await expect(page).toHaveTitle("Demo Web Shop");
    await page.getByRole("link", { name: 'Log in' }).click();
    await page.getByRole("textbox", { name: 'Email' }).fill("anitest@gmail.com");
    await page.getByRole("textbox", { name: 'Password' }).fill("Tweety@944");
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.waitForLoadState("networkidle");
    await expect(page.locator(".ico-logout")).toBeVisible();
    const computerHover = page.getByRole("link", { name: 'Computers' }).nth(0);
    await computerHover.hover();
    await page.getByRole("link", { name: 'Desktops' }).click();
    const desiredProduct = await page.getByRole("link", { name: "Build your own cheap computer" }).nth(1);
    await desiredProduct.click();
    const productPriceLocator = page.locator("span.price-value-72");
    await expect(productPriceLocator).toContainText('800');

});

test('Page context test', async ({ page }) => {
    // playwright code
    // Crete a new instance of the page
    await page.goto('https://www.google.com');
});