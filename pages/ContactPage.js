const { expect } = require('@playwright/test');

class ContactPage {
  constructor(page) {
    this.page = page;

    // --- General Elements ---
    this.searchInput = page.getByPlaceholder('Typ hier om te zoeken');
    this.firstSearchResult = page.locator('li.cursor-pointer').first();
    this.firstRadioOption = page.locator('[role="radio"]').first();
    this.noneOfTheAboveOption = page.getByText('Geen van bovenstaande', { exact: true });
    this.countryCodeInput = page.locator('input[placeholder="Country code"]');

    // --- Contact Fields ---
    this.firstNameInput = page.locator('#userFirstName:visible');
    this.lastNameInput = page.locator('#userLastName:visible');
    this.emailInput = page.locator('#userEmail:visible');
    this.phoneInput = page.locator('input[placeholder="Telefoonnummer"]:visible');

    // --- Checkboxes ---
    this.checkboxEmailOptIn = page.locator('gr-checkbox[name="emailOptIn"]');
    this.checkboxTerms = page.locator('gr-checkbox[name="agreeToTermsAndConditions"]');

    // --- Buttons ---
    this.continueButton = page.getByRole('button', { name: 'Volgende' });

    // --- Loan Summary ---
    this.loanSummarySection = this.page.locator('section:has(h3:text("Financieringsaanvraag"))');
    this.loanAmountSummary = this.loanSummarySection.locator('div.grid-cols-2').nth(0);
    this.loanPurposeSummary = page.locator('div.grid-cols-2:has-text("Waarvoor?") >> div.col-span-1').nth(1);
  }

  /**
   * Navigates to the contact page URL.
   */
  async navigate() {
    await this.page.goto('/request-loan/contact');
  }

  /**
   * Searches for a company by name or registration number.
   * @param {string} query - Company name or registration number.
   */
  async searchCompany(query) {
    await this.searchInput.fill(query);
    await this.page.waitForSelector('li.cursor-pointer', { timeout: 5000 });
    await this.firstSearchResult.click();
    await this.emailInput.waitFor({ state: 'visible' });
  }

  /**
   * Selects the first director option.
   */
  async selectFirstPerson() {
    await this.firstRadioOption.click();
    await this.page.waitForTimeout(500);
  }

  /**
   * Selects "None of the above" if user's role is not listed.
   */
  async selectNoneOfTheAbove() {
    await this.noneOfTheAboveOption.click();
    await this.page.waitForTimeout(500);
  }

  /**
   * Fills in only the email and phone number fields.
   * @param {string} email 
   * @param {string} phone 
   */
  async fillContactDetails(email, phone) {
    await this.emailInput.fill(email);
    await this.phoneInput.fill(phone);
    await this.page.waitForTimeout(500);
  }

  /**
   * Fills in all personal contact details manually.
   * @param {string} firstName 
   * @param {string} lastName 
   * @param {string} email 
   * @param {string} phone 
   */
  async fillManualDetails(firstName, lastName, email, phone) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.phoneInput.fill(phone);
    await this.emailInput.waitFor({ state: 'visible' });
  }

  /**
   * Accepts marketing and terms & conditions checkboxes.
   */
  async acceptConditions() {
    await this.checkboxEmailOptIn.click();
    await this.emailInput.waitFor({ state: 'visible' });
    await this.checkboxTerms.click();
    await this.emailInput.waitFor({ state: 'visible' });
  }

  /**
   * Clicks the "Continue" button to proceed.
   */
  async continue() {
    await this.continueButton.click();
    await this.page.waitForTimeout(1000);
  }
}

module.exports = { ContactPage };
