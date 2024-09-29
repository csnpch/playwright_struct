import { defineConfig, devices } from '@playwright/test';
import { env } from './internal/configs/load_env';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const onCI = env.CI
const onENV = env.NODE_ENV
const baseDirReport = `./playwright-report/${onENV}`

export default defineConfig({
  globalSetup: require.resolve('./internal/configs/global.setup.ts'),
  timeout: 10000, // default is 30000
  expect: {
    timeout: 10000, // default is 5000
  },
  testDir: './tests',
  fullyParallel: false, // Run tests in files in parallel
  forbidOnly: !!onCI, // Fail the build on CI if you accidentally left `test.only` in the source code.
  retries: onCI ? 2 : 0, // Retry on CI only
  workers: onCI ? 1 : undefined, // Opt out of parallel tests on CI.
  reporter: [ // Reporter to use. See https://playwright.dev/docs/test-reporters
    ['dot'],
    ['blob', { outputDir: `${baseDirReport}/blob` }],
    ['html', { outputFolder: `${baseDirReport}/html` }],
    ['json', { outputFile: `${baseDirReport}/json/report.json` }],
    ['junit', { outputFile: `${baseDirReport}/junit/report.xml` }],
    // (!onCI && ['label', { outputFolder: `...` }] || ['null']),  // if need disabled on local
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: {
      mode: 'retain-on-failure', // default is on-first-retry, recommened for CI,
    }
  },

  /* Configure projects for major browsers */
  projects: [
    // {
    //   name: 'chromium',
    //   use: { ...devices['Desktop Chrome'] },
    // },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
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
    {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
