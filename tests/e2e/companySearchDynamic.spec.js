const { test, expect } = require('@playwright/test');
const { ContactPage } = require('../../pages/ContactPage');

test('matching company results appear dynamically as user types', async ({ page }) => {
  const contactPage = new ContactPage(page);

  // Navigate to contact page
  await contactPage.navigate();

  // Start typing a company name
  await contactPage.searchInput.fill('Bridge');

  // Wait for matching results to appear
  const results = page.locator('li.cursor-pointer');
  await expect(results.first()).toBeVisible();

  //check that result contains "BridgeFund" or similar
  const text = await results.first().textContent();
  expect(text.toLowerCase()).toContain('bridge');
});
