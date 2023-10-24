const { test, expect } = require('@playwright/test');

test.only('Browser context test', async ({ browser }) => {
    // playwright code
    // Crete a new instance of the browser is context(incognito)
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://demowebshop.tricentis.com/');
    console.log(await page.title());
    await expect(page).toHaveTitle("Demo Web Shop");
    await page.getByRole("link", { name: 'Log in' }).click();
    await page.locator(".email").fill("anitest@gmail.com");
    await page.locator(".password").fill("Tweety@944");
    await page.getByRole('button', { name: 'Log in' }).click();
    await expect(page.locator(".ico-logout")).toBeVisible();

});

test('Page context test', async ({ page }) => {
    // playwright code
    // Crete a new instance of the page
    await page.goto('https://www.google.com');
});
