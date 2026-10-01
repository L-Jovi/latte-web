import { defineConfig, devices } from '@playwright/test';
// Tests the assembled GitHub Pages site (`npm run build:pages`) from its root, as latte.jovipro.com serves it.
export default defineConfig({
  testDir: './tests/pages',
  timeout: 30000,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: 'http://127.0.0.1:4190/',
    trace: 'retain-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'node tests/pages/serve.mjs _site',
    url: 'http://127.0.0.1:4190/index.html',
    reuseExistingServer: false,
  },
});
