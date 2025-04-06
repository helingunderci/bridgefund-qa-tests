const { test, expect } = require('@playwright/test');
const { LoanAmountPage } = require('../pages/LoanAmountPage');
const { getRandomInt } = require('../utils/utils');

test('user can manually enter loan amount into input field', async ({ page }) => {
  const loanAmountPage = new LoanAmountPage(page);
  await loanAmountPage.navigate();

  // Generate a random loan amount between 5000 and 250000
  const amount = getRandomInt(5000, 250000);

  // Fill it in
  await loanAmountPage.enterLoanAmountManually(amount);

  //Assertion: verify value is actually displayed
  await expect(loanAmountPage.loanAmountInput).toHaveValue(amount.toString());
});
