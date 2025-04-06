const { expect } = require('@playwright/test');
const { getRandomSliderStep, getRandomInt } = require('../utils/utils');

class LoanAmountPage {
  constructor(page) {
    this.page = page;

    // --- Loan Amount Controls ---
    this.slider = page.locator('input[type="range"]');
    this.loanAmountInput = page.locator('input.input-field.w-full.border-none.font-bold');

    // --- Dropdowns ---
    this.loanTypeDropdown = page.getByRole('combobox', { name: 'Welke financiering heeft je voorkeur?' });
    this.revenueDropdown = page.locator('#select-2 .select-label');
    this.timingDropdown = page.locator('#select-3 .select-label');
    this.purposeDropdown = page.locator('#select-4 .select-label');

    // --- Continue Button ---
    this.continueButton = page.getByRole('button', { name: 'Volgende' });
  }

  /**
   * Navigates to the loan amount page.
   */
  async navigate() {
    await this.page.goto('https://my.bridgefund.nl/nl/nl/request-loan/amount');
  }

  /**
   * Selects a random loan amount using the slider.
   */
  async setRandomLoanAmount() {
    const randomValue = getRandomSliderStep();

    // Move slider to max first to ensure reliable change
    await this.slider.evaluate(el => {
      el.value = 250000;
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    });

    // Then set it to a random value
    await this.slider.evaluate((el, value) => {
      el.value = value;
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    }, randomValue);

    await this.page.waitForTimeout(500);
    console.log(`Loan amount selected via slider: €${randomValue}`);
  }

  /**
   * Manually types a specific loan amount.
   */
  async enterLoanAmountManually(amount) {
    await this.loanAmountInput.fill('');
    await this.page.waitForTimeout(200);
    await this.loanAmountInput.type(amount.toString());
    await this.page.waitForTimeout(500);
  }

  /**
   * Selects loan type from dropdown.
   */
  async selectLoanType(optionText) {
    await this.loanTypeDropdown.click();
    const option = this.page.locator('gr-menu-item').filter({ hasText: optionText });
    await option.click();
    await this.page.waitForTimeout(300);
  }

  /**
   * Selects revenue range from dropdown.
   */
  async selectRevenueRange(optionText) {
    await this.revenueDropdown.click();
    const option = this.page.locator('gr-menu-item').filter({ hasText: optionText });
    await option.waitFor({ state: 'visible', timeout: 3000 });
    await this.page.waitForTimeout(300);
    await option.click();
    await this.page.waitForTimeout(500);
  }

  /**
   * Selects timing from dropdown (how soon the loan is needed).
   */
  async selectLoanNeedTiming(optionText) {
    await this.timingDropdown.click();
    const option = this.page.locator('gr-menu-item').filter({ hasText: optionText });
    await option.click();
    await this.page.waitForTimeout(300);
  }

  /**
   * Selects loan purpose from dropdown.
   */
  async selectLoanPurpose(optionText) {
    await this.purposeDropdown.click();
    const option = this.page.locator('gr-menu-item').filter({ hasText: optionText });
    await option.click();
    await this.page.waitForTimeout(300);
  }

  /**
   * Proceeds to the next step.
   */
  async clickContinue() {
    await this.continueButton.click();
    await this.page.waitForLoadState('networkidle');
  }
}

module.exports = { LoanAmountPage };
