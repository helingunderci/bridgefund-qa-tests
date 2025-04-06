const { test, expect } = require('@playwright/test');
const { ContactPage } = require('../pages/ContactPage');

const viewports = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1280, height: 800 },
];

for (const viewport of viewports) {
  test(`company search shows dynamic results on contact page (${viewport.name})`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });

    const contactPage = new ContactPage(page);
    await contactPage.navigate();

    // Type company name in the search field
    await contactPage.searchInput.fill('BridgeFund');

    // Wait for result suggestions
    const results = page.locator('li.cursor-pointer');
    await expect(results.first()).toBeVisible();
  });
}
