import { defineConfig } from '@playwright/test';
import { env } from './utils/env';

export default defineConfig({
  testDir: './tests',

  timeout: env.timeout,

  retries: env.retries,

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  workers: process.env.CI ? 1 : undefined,

  reporter: [
        ['line'],
        ['html', { outputFolder: 'playwright-report', open: 'never' }],
        ['allure-playwright', {
            outputFolder: 'allure-results',
            suiteTitle: false,
        }],
    ],

  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',

    baseURL: env.baseUrl,

    headless: env.headless,
    
  },

  projects: [
    {
      name: 'chromium',
      use: {
            channel: 'chromium',
            //viewport: null,
            launchOptions: {
              // slowMo: 1000,
                args: [
                    '--window-size=1920,1080',
                        '--disable-features=Translate',
                        '--disable-features=TranslateUI',
                ],
            },
        },
    },

    //{
      //name: 'firefox',
      //use: { ...devices['Desktop Firefox'] },
    //},

    //{
      //name: 'webkit',
      //use: { ...devices['Desktop Safari'] },
    //},
  ],
});