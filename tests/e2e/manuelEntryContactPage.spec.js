const { test, expect } = require('@playwright/test');
const { ContactPage } = require('../../pages/ContactPage');

test('user selects none of the directors and fills personal details manually', async ({ page }) => {
  const contactPage = new ContactPage(page);

  await contactPage.navigate();
  await contactPage.searchCompany('BridgeFund');

  // Select "None of the above" option for directors
  await contactPage.selectNoneOfTheAbove();

  //Fill in personal details manually
  const email = 'hgunderci@gmail.com';
  const phone = '612345678';
  await contactPage.fillManualDetails('Sophia', 'Andersen', email, phone);

  //Assert that default country code is selected
  await expect(contactPage.countryCodeInput).toHaveValue('+31');

  //Accept marketing and terms checkboxes
  await contactPage.acceptConditions();
  await contactPage.continue();

  // Assert navigation to next step (loan amount page)
  await expect(page).toHaveURL(/\/amount$/);
});
