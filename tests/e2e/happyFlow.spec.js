const { test, expect } = require('@playwright/test');
const { LoanAmountPage } = require('../../pages/LoanAmountPage');
const { ContactPage } = require('../../pages/ContactPage');
const { getRandomInt, getRandomItem } = require('../../utils/utils');

test('user completes the full happy flow successfully', async ({ page }) => {
  const loanPage = new LoanAmountPage(page);
  const contactPage = new ContactPage(page);

  // Step 1 – Navigate to loan amount page
  await loanPage.navigate();

  // Step 2 – Enter loan details
  const amount = getRandomInt(5000, 250000);
  const purpose = getRandomItem(['Machines', 'Inventaris', 'Marketing']);

  await loanPage.enterLoanAmountManually(amount);
  await loanPage.selectLoanType('Eenmalig een vast bedrag');
  await loanPage.selectRevenueRange('€150.000 - €500.000');
  await loanPage.selectLoanNeedTiming('Vandaag');
  await loanPage.selectLoanPurpose(purpose);
  await loanPage.clickContinue();

  // Step 3 – Contact page
  await expect(page).toHaveURL(/contact/);
  await contactPage.searchCompany('BridgeFund');
  await contactPage.selectFirstPerson();
  await contactPage.fillContactDetails('hgunderci@gmail.com', '612345678');
  await contactPage.acceptConditions();
  await contactPage.continue();
});
