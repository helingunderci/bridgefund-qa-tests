# Bridgefund QA Automation Tests

This repository contains end-to-end automated UI tests built with [Playwright](https://playwright.dev) to validate the loan request flow on Bridgefund.

---

## Features

- **Page Object Model (POM)** structure for maintainability
- **Cross-device layout checks** (mobile, tablet, desktop)
- **Happy flow coverage** from loan amount to contact step
- **Retry and flakiness handling**
- **CI/CD ready structure**

---

## Project Structure

```
bridgefund-qa-tests/
├── pages/               # Page Object Models
│   ├── ContactPage.js
│   └── LoanAmountPage.js
│
├── tests/               # Test specifications
│   ├── contact/         # Contact page tests
│   ├── loan/            # Loan amount page tests
│   └── happyFlow/       # End-to-end test
│
├── utils/               # Utility functions
│   └── utils.js
│
├── playwright.config.js # Playwright configuration
└── README.md
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/helingunderci/bridgefund-qa-tests.git
cd bridgefund-qa-tests
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run all tests

```bash
npx playwright test
```

### 4. Run specific tests

```bash
npx playwright test tests/contact/contactForm.spec.js
```

### 5. View HTML report

```bash
npx playwright show-report
```

---

## Tech Stack

- [Playwright Test](https://playwright.dev/)
- JavaScript
- Node.js
- GitHub Actions

---

## Notes

- All tests follow **POM pattern** for structure and reuse.
- Flaky behavior is handled using `waitFor` and proper assertions.
- CI/CD environments should whitelist test domain (403s may occur otherwise).
