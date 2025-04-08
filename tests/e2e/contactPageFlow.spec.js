const { test, expect } = require('@playwright/test');
const { ContactPage } = require('../../pages/ContactPage');

test('user can fill contact form and continue', async ({ page }) => {
  const contactPage = new ContactPage(page);

  await contactPage.navigate();
  await page.waitForLoadState('networkidle');

  await contactPage.searchInput.waitFor({ state: 'visible', timeout: 5000 });
  await contactPage.searchCompany('BridgeFund');
  await contactPage.selectFirstPerson();

  await contactPage.emailInput.waitFor({ state: 'visible', timeout: 3000 });
  await contactPage.fillContactDetails('hgunderci@gmail.com', '612345678');
  await contactPage.acceptConditions();
  await contactPage.continue();

  await expect(page).toHaveURL(/\/amount$/, { timeout: 5000 });
});

test('user can search company by registration number and continue', async ({ page }) => {
  const contactPage = new ContactPage(page);

  await contactPage.navigate();
  await page.waitForLoadState('networkidle');

  await contactPage.searchInput.waitFor({ state: 'visible', timeout: 5000 });
  await contactPage.searchCompany('70304580');
  await contactPage.selectFirstPerson();

  await contactPage.emailInput.waitFor({ state: 'visible', timeout: 3000 });
  await contactPage.fillContactDetails('osmith@gmail.com', '612345678');
  await contactPage.acceptConditions();
  await contactPage.continue();

  await expect(page).toHaveURL(/\/amount$/, { timeout: 5000 });
});
