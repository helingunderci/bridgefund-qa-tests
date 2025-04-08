const { test, expect } = require('@playwright/test');
const { ContactPage } = require('../../pages/ContactPage');

test('user can go back to previous step and see preserved form data', async ({ page }) => {
  const contactPage = new ContactPage(page);

  await contactPage.navigate();

  // Fill in company and contact details
  await contactPage.searchCompany('BridgeFund');
  await contactPage.selectFirstPerson();
  await contactPage.fillContactDetails('test@example.com', '612345678');

  //Click "Vorige" (Back) to go to loan amount page
  const backButton = page.getByRole('link', { name: 'Vorige' });
  await expect(backButton).toBeVisible();

  await Promise.all([
    page.waitForURL(/\/amount$/, { timeout: 7000 }),
    backButton.click(),
  ]);

  await page.waitForTimeout(700);
  await contactPage.navigate();
  await expect(contactPage.emailInput).toHaveValue('test@example.com');
});
