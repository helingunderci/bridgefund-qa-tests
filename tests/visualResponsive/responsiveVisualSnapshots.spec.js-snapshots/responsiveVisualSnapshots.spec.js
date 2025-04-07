const { test, expect } = require('@playwright/test');
const { LoanAmountPage } = require('../../../pages/LoanAmountPage');
const { ContactPage } = require('../../../pages/ContactPage');

const viewports = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1280, height: 807 },
];

// Loan Amount Page
for (const viewport of viewports) {
  test(`loan amount page UI looks correct on ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });

    const loanPage = new LoanAmountPage(page);
    await loanPage.navigate(); // 👈 URL artık class içinden geliyor

    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000); // Wait for layout/fonts/animations

    await expect(page).toHaveScreenshot(`loan-amount-${viewport.name}.png`, {
      fullPage: true,
      animations: 'disabled',
      timeout: 7000,
      maxDiffPixelRatio: 0.25,
    });
  });
}

// Contact Page
for (const viewport of viewports) {
  test(`contact page UI looks correct on ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });

    const contactPage = new ContactPage(page);
    await contactPage.navigate(); // 👈 URL artık class içinden geliyor

    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    await expect(page).toHaveScreenshot(`contact-page-${viewport.name}.png`, {
      fullPage: true,
      animations: 'disabled',
      timeout: 7000,
      maxDiffPixelRatio: 0.25,
    });
  });
}
