const { test, expect } = require('@playwright/test');
const { ContactPage } = require('../../pages/ContactPage');
const viewports = require('../../utils/viewports');

for (const viewport of viewports) {
  test(`Company search shows dynamic results on Contact page (${viewport.name})`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });

    const contactPage = new ContactPage(page);
    await contactPage.navigate();

    // Wait until the search input is visible and type a company name
    await contactPage.searchInput.waitFor({ state: 'visible', timeout: 5000 });
    await contactPage.searchInput.fill('BridgeFund');

    // Wait for the dynamic result suggestions to appear
    const results = page.locator('li.cursor-pointer');
    await expect(results.first()).toBeVisible();

    // Validate the first result contains the searched keyword
    const firstResultText = await results.first().textContent();
    expect(firstResultText.toLowerCase()).toContain('bridge');
  });
}
