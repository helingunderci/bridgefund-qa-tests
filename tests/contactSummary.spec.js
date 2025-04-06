const { test, expect } = require('@playwright/test');
const { LoanAmountPage } = require('../pages/LoanAmountPage');
const { ContactPage } = require('../pages/ContactPage');
const { getRandomInt, getRandomItem } = require('../utils/utils'); // utility functions

test('summary of selected loan details is displayed correctly on contact page', async ({ page }) => {
  const loanAmountPage = new LoanAmountPage(page);
  const contactPage = new ContactPage(page);

  // Navigate to the loan amount page
  await loanAmountPage.navigate();

  // Generate a random loan amount
  const amount = getRandomInt(5000, 250000);

  // Choose a random loan purpose from dropdown options
  const purposes = ['Machines', 'Inventaris', 'Voorraad', 'Belastingen', 'Marketing'];
  const purpose = getRandomItem(purposes);

  // Fill in loan details
  await loanAmountPage.enterLoanAmountManually(amount);
  await loanAmountPage.selectLoanType('Eenmalig een vast bedrag');
  await loanAmountPage.selectRevenueRange('€150.000 - €500.000');
  await loanAmountPage.selectLoanNeedTiming('Vandaag');
  await loanAmountPage.selectLoanPurpose(purpose);

  // Proceed to contact page
  await loanAmountPage.clickContinue();
  await expect(page).toHaveURL(/contact/);

  // Verify summary section is visible
  await expect(contactPage.loanAmountSummary).toBeVisible();

  // Verify the loan purpose in the summary
  await expect(contactPage.loanPurposeSummary).toBeVisible();
  await expect(contactPage.loanPurposeSummary).toContainText(purpose);
});
