const { test, expect } = require('@playwright/test');
const { ContactPage } = require('../../pages/ContactPage');

test('user selects none of the directors and fills personal details manually', async ({ page }) => {
  const contactPage = new ContactPage(page);

  await contactPage.navigate();
  await contactPage.searchCompany('BridgeFund');

  await contactPage.selectNoneOfTheAbove();

  const email = 'hgunderci@gmail.com';
  const phone = '612345678';
  await contactPage.fillManualDetails('Sophia', 'Andersen', email, phone);

  await expect(contactPage.countryCodeInput).toHaveValue('+31');

  await contactPage.acceptConditions();
  await contactPage.continue();

  await expect(page).toHaveURL(/\/amount$/);
});
