import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry */
  retries: process.env.CI ? 2 : 2,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 2,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  timeout: 60 * 1000,
  expect: {
    timeout: 15 * 1000,
  },
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL:
      process.env.PLAYWRIGHT_TEST_BASE_URL ||
      'http://127.0.0.1:8081',

    trace: 'on-first-retry',
    actionTimeout: 15 * 1000,
    navigationTimeout: 30 * 1000,

    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        viewport: {
          width: 1440,
          height: 900,
        },
      },
    },

    {
      name: 'firefox',
      use: {
        browserName: 'firefox',
        viewport: {
          width: 1440,
          height: 900,
        },
        deviceScaleFactor: 1,
      },
    },

    {
      name: 'webkit',
      use: {
        browserName: 'webkit',
        viewport: {
          width: 1440,
          height: 900,
        },
      },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'CI=1 npx expo start --web',
    url:
      process.env.PLAYWRIGHT_TEST_BASE_URL ||
      'http://127.0.0.1:8081',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
