const { test, expect } = require('@playwright/test');
const { ContactPage } = require('../../pages/ContactPage');

test('contact support info is visible on contact page', async ({ page }) => {
  const contactPage = new ContactPage(page);
  await contactPage.navigate();

  // Wait for page to fully load
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(800); // stabilize the layout

  // Check phone number
  const phoneNumber = page.getByText('085 - 401 6600');
  await expect(phoneNumber).toBeVisible();

  // Check at least one visible representative image
  const images = page.locator('img');
  await expect(images.first()).toBeVisible();
});
