const { test, expect } = require('@playwright/test');
const { ContactPage } = require('../../pages/ContactPage');

test('user can fill contact form and continue', async ({ page }) => {
  const contactPage = new ContactPage(page);

  // Navigate to the contact page using baseURL
  await contactPage.navigate();

  // Search for the company by name
  await contactPage.searchCompany('BridgeFund');
  await contactPage.selectFirstPerson();

  // Fill in the contact form
  await contactPage.fillContactDetails('hgunderci@gmail.com', '612345678');
  await contactPage.acceptConditions();
  await contactPage.continue();

  // Verify navigation to the loan amount page
  await expect(page).toHaveURL(/\/amount$/);
});

test('user can search company by registration number and continue', async ({ page }) => {
  const contactPage = new ContactPage(page);

  // Navigate to the contact page using baseURL
  await contactPage.navigate();

  // Search for the company by registration number
  await contactPage.searchCompany('70304580');
  await contactPage.selectFirstPerson();

  // Fill in the contact form
  await contactPage.fillContactDetails('osmith@gmail.com', '612345678');
  await contactPage.acceptConditions();
  await contactPage.continue();

  // Verify navigation to the loan amount page
  await expect(page).toHaveURL(/\/amount$/);
});
