*** Install allure playwright ***
`npm i -D @playwright/test allure-playwright`

Either add allure-playwright into playwright.config.ts:
{
  reporter: "allure-playwright";
}

Or pass the same value via command line:
`npx playwright test --reporter=line,allure-playwright`

***Generate Allure Report***

allure generate allure-results -o allure-report --clean

***Open Allure Report***
`allure open allure-report`


To run tests from package.json file run command:

`npm run webTests`
