const { test, expect } = require('@playwright/test');
const { LoanAmountPage } = require('../../pages/LoanAmountPage');
const { getRandomInt } = require('../../utils/utils');

test('user can manually enter loan amount into input field', async ({ page }) => {
  const loanAmountPage = new LoanAmountPage(page);
  await loanAmountPage.navigate();

  const amount = getRandomInt(5000, 250000);
  await loanAmountPage.loanAmountInput.waitFor({ state: 'visible' });
  await loanAmountPage.enterLoanAmountManually(amount);

  await expect(loanAmountPage.loanAmountInput).toHaveValue(amount.toString());
});
