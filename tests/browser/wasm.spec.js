import { test, expect } from '@playwright/test';
test('calls the compiled Rust export, including signed overflow', async ({
  page,
}) => {
  await page.goto('/examples/wasm/dist/');
  await page.getByRole('button', { name: 'Add in Rust' }).click();
  await expect(page.locator('output')).toHaveText('5');
  await page.getByLabel('A', { exact: true }).fill('-8');
  await page.getByLabel('B', { exact: true }).fill('3');
  await page.getByRole('button').click();
  await expect(page.locator('output')).toHaveText('-5');
  await page.getByLabel('A', { exact: true }).fill('2147483647');
  await page.getByLabel('B', { exact: true }).fill('1');
  await page.getByRole('button').click();
  await expect(page.locator('output')).toHaveText('-2147483648');
});
