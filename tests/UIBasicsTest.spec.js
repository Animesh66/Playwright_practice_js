const { test, expect } = require('@playwright/test');

test.only('Browser context test', async ({ browser }) => {
    // playwright code
    // Crete a new instance of the browser is context(incognito)
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://demowebshop.tricentis.com/');
    console.log(page.title);
    await expect(page).toHaveTitle("Demo Web Shop");
});

test('Page context test', async ({ page }) => {
    // playwright code
    // Crete a new instance of the page
    await page.goto('https://www.google.com');
});