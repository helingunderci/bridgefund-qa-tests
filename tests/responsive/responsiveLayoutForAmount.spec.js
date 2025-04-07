const { test, expect } = require('@playwright/test');
const { LoanAmountPage } = require('../../pages/LoanAmountPage');

const viewports = [
    { name: 'mobile', width: 375, height: 812 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1280, height: 800 },
];

for (const viewport of viewports) {
    test(`loan amount page layout and dropdown works on ${viewport.name}`, async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });

        const loanPage = new LoanAmountPage(page);
        await loanPage.navigate();

        //Core UI visibility checks
        await expect(loanPage.loanAmountInput).toBeVisible();
        await expect(page.locator('#select-1')).toBeVisible();
        await expect(page.locator('input[type="range"]')).toBeVisible();

        //Test dropdown open state
        const dropdown = page.locator('#select-1 .select-label');
        await dropdown.click();

        const dropdownOptions = page.locator('gr-menu-item');
        await expect(dropdownOptions.first()).toBeVisible();
    });
}
