const { test, expect } = require('@playwright/test');
const { LoanAmountPage } = require('../../pages/LoanAmountPage');
const viewports = require('../../utils/viewports');

for (const viewport of viewports) {
  test(`Loan Amount page layout and dropdown functionality works on ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });

    const loanPage = new LoanAmountPage(page);
    await loanPage.navigate();

    // Assert key UI elements are visible
    await expect(loanPage.loanAmountInput).toBeVisible();
    await expect(page.locator('#select-1')).toBeVisible(); // Loan type dropdown
    await expect(page.locator('input[type="range"]')).toBeVisible(); // Slider

    // Open dropdown and check options are visible
    const dropdownTrigger = page.locator('#select-1 .select-label');
    await dropdownTrigger.click();
    const options = page.locator('gr-menu-item');
    await expect(options.first()).toBeVisible();

    // Select first option and verify it changed
    const initialText = await dropdownTrigger.textContent();
    await options.first().click();
    const updatedText = await dropdownTrigger.textContent();

    expect(updatedText).not.toBe(initialText);
    await expect(dropdownTrigger).not.toHaveText('Selecteer');
  });
}
