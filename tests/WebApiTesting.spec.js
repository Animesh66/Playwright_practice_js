const {test, expect, request} = require('@playwright/test')

let webContext;

test.beforeAll('WebAPItest', async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await expect(page).toHaveTitle("Let's Shop");
    await page.getByRole('textbox', { name: 'Email' }).fill("anitest@email.com");
    await page.getByPlaceholder('enter your passsword').fill('Test12345678');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForLoadState('networkidle');
    await context.storageState({path: 'storageState.json'}); // This will create a JSON file with exiting storageState
    webContext= await browser.newContext({storageState: 'storageState.json' }); // This will create a new context with the storage state  as mentioned in JSON.
})

test.only('Dahboard Page Test Without Login', async () => {
    const dashboardPage = await webContext.newPage();
    await dashboardPage.goto("https://rahulshettyacademy.com/client");
    await expect(dashboardPage.getByRole('button', { name: 'HOME'})).toBeVisible();

})
