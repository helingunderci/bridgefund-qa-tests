const { test, expect } = require('@playwright/test');
const { ContactPage } = require('../../pages/ContactPage');

test('matching company results appear dynamically as user types', async ({ page }) => {
  const contactPage = new ContactPage(page);

  // Navigate to contact page
  await contactPage.navigate();
  await page.waitForLoadState('networkidle');

  // Wait for input field to be ready
  await contactPage.searchInput.waitFor({ state: 'visible', timeout: 5000 });

  // Start typing a company name
  await contactPage.searchInput.fill('Bridge');

  // Wait for list to appear and stabilize
  const results = page.locator('li.cursor-pointer');
  await expect(results.first()).toBeVisible({ timeout: 7000 }); 

  // Wait for text content to actually exist (in case of late rendering)
  await expect(results.first()).toHaveText(/bridge/i, { timeout: 7000 });
});
