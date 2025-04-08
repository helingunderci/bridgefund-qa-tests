const { test, expect } = require('@playwright/test');
const { LoanAmountPage } = require('../../pages/LoanAmountPage');

test('user can complete loan amount step successfully', async ({ page }) => {
  const loanPage = new LoanAmountPage(page);
  await loanPage.navigate();
  await page.waitForLoadState('networkidle');

  await loanPage.setRandomLoanAmount();
  await loanPage.selectLoanType('Doorlopend toegang tot krediet');
  await loanPage.selectRevenueRange('€150.000 - €500.000');
  await loanPage.selectLoanNeedTiming('Binnen een week');
  await loanPage.selectLoanPurpose('Machines');

  const continueButton = page.getByRole('button', { name: 'Volgende' });
  await expect(continueButton).toBeEnabled();
  await continueButton.click();

  await expect(page).toHaveURL(/\/contact$/);
});
