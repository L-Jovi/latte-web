import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './tests/browser',
  testIgnore: process.env.LATTE_WASM ? [] : ['**/wasm.spec.js'],
  timeout: 30000,
  workers: process.env.CI ? 2 : 3,
  reporter: process.env.CI ? 'github' : 'list',
  use: { baseURL: 'http://127.0.0.1:4173', trace: 'retain-on-failure' },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
  webServer: {
    command: process.env.LATTE_WASM
      ? 'npm run dev'
      : 'node --import tsx scripts/test-services.ts',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: false,
  },
});
