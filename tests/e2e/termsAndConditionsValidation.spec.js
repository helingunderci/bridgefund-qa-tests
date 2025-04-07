const { test, expect } = require('@playwright/test');
const { ContactPage } = require('../../pages/ContactPage');

test('user unchecks the terms checkbox and sees validation error after blur', async ({ page }) => {
  const contactPage = new ContactPage(page);
  await contactPage.navigate();

  await contactPage.searchCompany('BridgeFund');
  await contactPage.selectFirstPerson();
  await contactPage.fillContactDetails('test@example.com', '612345678');

  // Check and uncheck the Terms checkbox
  await contactPage.checkboxTerms.click(); // check
  await contactPage.checkboxTerms.click(); // uncheck

  // Click outside 
  await page.locator('body').click();

  // Wait a bit to allow validation to appear
  await page.waitForTimeout(500);

  // Assert validation error is visible
  const errorMessage = page.locator('text=Dit veld is verplicht');
  await expect(errorMessage).toBeVisible();
});
