const {test, expect, request} = require('@playwright/test')


test.only('Handle multiple window in playwright', async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.getByRole('link', {name: 'Free Access to InterviewQues/ResumeAssistance/Material'})
    const [newPage] = await Promise.all(
        [context.waitForEvent('page'), documentLink.click()]); // Wait for page and click on link. Race codition. 
    const actualText = await newPage.locator('.red').textContent();
    console.log(actualText);
})  
