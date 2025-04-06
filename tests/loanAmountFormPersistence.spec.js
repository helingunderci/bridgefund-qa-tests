const { test, expect } = require('@playwright/test');
const { LoanAmountPage } = require('../pages/LoanAmountPage');
const { getRandomInt } = require('../utils/utils'); // utility for random int

test('loan amount form retains values after refresh', async ({ page }) => {
  const loanPage = new LoanAmountPage(page);
  await loanPage.navigate();

  // Ensure the amount is a multiple of 1000
  const step = 1000;
  const loanAmount = Math.floor(getRandomInt(5000, 250000) / step) * step;

  const loanType = 'Eenmalig een vast bedrag';
  const revenue = '€150.000 - €500.000';
  const timing = 'Vandaag';
  const purpose = 'Machines';

  // Fill form fields
  await loanPage.enterLoanAmountManually(loanAmount);
  await loanPage.selectLoanType(loanType);
  await loanPage.selectRevenueRange(revenue);
  await loanPage.selectLoanNeedTiming(timing);
  await loanPage.selectLoanPurpose(purpose);

  // Refresh the page
  await page.evaluate(() => location.reload());
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(1000);

  await expect(loanPage.loanAmountInput).toHaveValue(loanAmount.toLocaleString('nl-NL'));

  await expect(page.locator('#select-1 .select-label')).toHaveText(loanType);
  await expect(page.locator('#select-2 .select-label')).toHaveText(revenue);
  await expect(page.locator('#select-3 .select-label')).toHaveText(timing);
  await expect(page.locator('#select-4 .select-label')).toHaveText(purpose);
});
