import { defineConfig, devices } from '@playwright/test';
// Tests the assembled GitHub Pages site (`npm run build:pages`) under its /latte-web/ prefix.
export default defineConfig({
  testDir: './tests/pages',
  timeout: 30000,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: 'http://127.0.0.1:4180/latte-web/',
    trace: 'retain-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'node tests/pages/serve.mjs _site',
    url: 'http://127.0.0.1:4180/latte-web/index.html',
    reuseExistingServer: false,
  },
});
