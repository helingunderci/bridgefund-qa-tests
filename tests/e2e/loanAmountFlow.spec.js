const { test, expect } = require('@playwright/test');
const { LoanAmountPage } = require('../../pages/LoanAmountPage');

test('user can complete loan amount step successfully', async ({ page }) => {
  const loanPage = new LoanAmountPage(page);
  await loanPage.navigate();

  // Select a random loan amount using the slider
  await loanPage.setRandomLoanAmount();

  // Fill out the required dropdown fields
  await loanPage.selectLoanType('Doorlopend toegang tot krediet');
  await loanPage.selectRevenueRange('€150.000 - €500.000');
  await loanPage.selectLoanNeedTiming('Binnen een week');
  await loanPage.selectLoanPurpose('Machines');

  // Click the "Continue" button
  const continueButton = page.getByRole('button', { name: 'Volgende' });
  await continueButton.click();

  // Verify that user is redirected to the contact page
  await expect(page).toHaveURL(/.*\/contact/);

  // Wait briefly to visualize the page transition
  await page.waitForTimeout(1000);
});
