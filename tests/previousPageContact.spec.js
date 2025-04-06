const { test, expect } = require('@playwright/test');
const { ContactPage } = require('../pages/ContactPage');

test('user can go back to previous step and see preserved form data', async ({ page }) => {
  const contactPage = new ContactPage(page);

  await contactPage.navigate();

  await contactPage.searchCompany('BridgeFund');
  await contactPage.selectFirstPerson();
  await contactPage.fillContactDetails('test@example.com', '612345678');

  const backButton = page.getByRole('link', { name: 'Vorige' });
  await expect(backButton).toBeVisible();

  await Promise.all([
    page.waitForURL(/\/amount$/, { timeout: 7000 }),
    backButton.click(),
  ]);

  await page.waitForTimeout(500);
  
  // Go back to contact page again
  await contactPage.navigate();
  await expect(contactPage.emailInput).toHaveValue('test@example.com');
});
