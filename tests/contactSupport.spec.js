const { test, expect } = require('@playwright/test');
const { ContactPage } = require('../pages/ContactPage');

test('contact support info is visible on contact page', async ({ page }) => {
  const contactPage = new ContactPage(page);
  await contactPage.navigate();

  // Phone number should be visible
  await expect(page.getByText('085 - 401 6600')).toBeVisible();

  // Representative images should be visible (check that at least one <img> is visible)
  const images = page.locator('img');
  await expect(images.nth(0)).toBeVisible(); // check the first image is visible

  // wait so we can see the page before it closes
  await page.waitForTimeout(2000); 
});
