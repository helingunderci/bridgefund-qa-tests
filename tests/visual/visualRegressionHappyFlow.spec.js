const { test, expect } = require('@playwright/test');
const { LoanAmountPage } = require('../../pages/LoanAmountPage');
const { ContactPage } = require('../../pages/ContactPage');

test('full loan request visual flow with open dropdowns and screenshots (stable)', async ({ page }) => {
  const loanPage = new LoanAmountPage(page);
  const contactPage = new ContactPage(page);

  // Viewport + Navigation
  await page.setViewportSize({ width: 1280, height: 807 });
  await loanPage.navigate();
  await page.waitForLoadState('networkidle');
  await loanPage.loanAmountInput.waitFor({ state: 'visible', timeout: 5000 });

  // Screenshot #1: Initial Loan Page
  await expect(page).toHaveScreenshot('01-loan-page-initial.png', {
    fullPage: true,
    animations: 'disabled',
    timeout: 7000,
    maxDiffPixelRatio: 0.05,
  });

  // Fill Loan Amount manually (static)
  await loanPage.enterLoanAmountManually(150000);
  await loanPage.loanAmountInput.waitFor({ state: 'attached' });

  await expect(page).toHaveScreenshot('02-loan-slider-adjusted.png', {
    fullPage: true,
    maxDiffPixelRatio: 0.05,
  });

  // Open each dropdown and take screenshot
  const dropdowns = [
    { name: 'loanType', trigger: page.getByRole('combobox', { name: /financiering/i }) },
    { name: 'revenue', trigger: page.locator('#select-2 .select-label') },
    { name: 'timing', trigger: page.locator('#select-3 .select-label') },
    { name: 'purpose', trigger: page.locator('#select-4 .select-label') },
  ];

  for (const { name, trigger } of dropdowns) {
    await trigger.waitFor({ state: 'visible' });
    await trigger.click();
    await expect(page).toHaveScreenshot(`03-dropdown-${name}-open.png`, {
      fullPage: true,
      maxDiffPixelRatio: 0.05,
    });
    await page.keyboard.press('Escape');
  }

  // Select values for dropdowns
  await loanPage.selectLoanType('Eenmalig een vast bedrag');
  await loanPage.selectRevenueRange('€150.000 - €500.000');
  await loanPage.selectLoanNeedTiming('Vandaag');
  await loanPage.selectLoanPurpose('Marketing');

  await expect(page).toHaveScreenshot('04-loan-dropdowns-filled.png', {
    fullPage: true,
    maxDiffPixelRatio: 0.05,
  });

  // Navigate to contact page
  await loanPage.clickContinue();
  await expect(page).toHaveURL(/\/contact/);
  await contactPage.searchInput.waitFor({ state: 'visible' });

  await expect(page).toHaveScreenshot('05-contact-page-loaded.png', {
    fullPage: true,
    maxDiffPixelRatio: 0.05,
  });

  // Company search
  await contactPage.searchInput.fill('BridgeFund');
  await page.waitForSelector('li.cursor-pointer', { timeout: 5000 });
  await expect(page.locator('li.cursor-pointer').first()).toBeVisible();

  await expect(page).toHaveScreenshot('06-contact-company-search-results.png', {
    fullPage: true,
    maxDiffPixelRatio: 0.05,
  });

  // Select company & director
  await contactPage.firstSearchResult.click();
  await contactPage.firstRadioOption.waitFor({ state: 'visible' });
  await contactPage.selectFirstPerson();

  await expect(page).toHaveScreenshot('07-contact-director-selected.png', {
    fullPage: true,
    maxDiffPixelRatio: 0.05,
  });

  // Fill contact info
  await contactPage.fillContactDetails('hgunderci@gmail.com', '612345678');
  await contactPage.acceptConditions();

  await expect(page).toHaveScreenshot('08-contact-form-filled.png', {
    fullPage: true,
    maxDiffPixelRatio: 0.05,
  });
});
