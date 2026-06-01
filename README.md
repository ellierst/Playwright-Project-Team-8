# Playwright Project – Team 8

Automated end-to-end testing framework based on [Playwright](https://playwright.dev/) using TypeScript.
The project contains a prepared structure for writing tests using the Page Object Model pattern and supports configuration via environment variables.

---

## Requirements

- [Node.js](https://nodejs.org/) version 18 or higher
- npm version 8 or higher

---

## Installation

**1. Clone the repository:**

```bash
git clone https://github.com/ellierst/Playwright-Project-Team-8.git
cd playwright-project-team-8
```

**2. Install Playwright browsers:**

```bash
npx playwright install
```

**3. Install the dotenv package:**

```bash
npm install dotenv
npm install --save-dev @types/node
```

**4. Install Allure dependencies**
```bash
npm install -D allure-playwright allure-commandline
npm install -D @playwright/test
```

**5. Install Node types (for TypeScript):**
```bash
npm install --save-dev @types/node
```

**6. Create a .env file based on the example:**

```bash
cp .env.example .env
```

Open `.env` and configure the variables:

```env
BASE_URL=https://your-app-url.com
HEADLESS=true
RETRIES=0
TIMEOUT=30000
TEST_EMAIL=youremail
TEST_PASSWORD=yourpassword
```

---

## Running Tests

**Run all tests (all browsers):**

```bash
npx playwright test
```

**Run tests in a single browser:**

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
```

**Run in headed mode:**

```bash
npx playwright test --headed
```

**View HTML report after execution:**

```bash
npx playwright show-report
```


**View Allure Report:**

```bash
npx allure generate allure-results -o allure-report --clean
npx allure open allure-report
```

---

## Environment Variables

All variables are defined in the `.env file` (not committed to the repository).
The `.env.example` file contains a template with all available variables:

| Variable | Description | Default value |
|---|---|---|
| `BASE_URL` | Base URL of the application | `app url` |
| `HEADLESS` | Run browser in headless mode | `true` |
| `RETRIES` | Number of retries on test failure | `0` |
| `TIMEOUT` | Maximum timeout (ms) | `30000` |
| `TEST_EMAIL` | Email for login | `email` |
| `TEST_PASSWORD` | Password for login | `password` |

---

## Project Structure

```
playwright-project-team-8/
│
├── tests/                  # Test cases
│
├── pages/                  # Page Object Model classes
│
├── components/             # Reusable UI components
│
├── fixtures/               # Playwright fixtures (test context extensions)
│
├── utils/                  # Utility helpers
│   └── env.ts              # Environment variables helper
│
├── .env.example            # Environment variables template
├── .gitignore
├── package.json
├── playwright.config.ts    # Playwright configuration
└── README.md
```

---

## Browsers

Tests run across three browsers by default:

- **Chromium** (Google Chrome)
- **Firefox**

Browser configuration can be changed in `playwright.config.ts`.