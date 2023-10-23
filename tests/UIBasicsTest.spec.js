const { test, expect } = require('@playwright/test');

test.only('Browser context test', async ({ browser }) => {
    // playwright code
    // Crete a new instance of the browser is context(incognito)
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://demowebshop.tricentis.com/');
    console.log(await page.title);
    await expect(page).toHaveTitle("Demo Web Shop");
    await page.locator(".ico-login").click();
    // await page.getByRole("link", "Log in").click();
    await page.locator(".email").fill("anitest@gmail.com");
    await page.locator(".password").fill("Tweety@944");
    await page.locator(".button-1 login-button").click();
});

test('Page context test', async ({ page }) => {
    // playwright code
    // Crete a new instance of the page
    await page.goto('https://www.google.com');
});