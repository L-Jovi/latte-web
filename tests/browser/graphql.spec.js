import { test, expect } from '@playwright/test';
test('Apollo login, pagination, search, publish, vote and subscription', async ({
  page,
  browser,
}, testInfo) => {
  const other = await browser.newPage();
  const name = 'Browser link ' + testInfo.project.name + ' ' + Date.now();
  try {
    await page.goto('/examples/graphql/client/dist/');
    await expect(page.locator('li')).toHaveCount(3);
    await page.getByRole('button', { name: 'Next', exact: true }).click();
    await expect(
      page.getByRole('button', { name: 'Previous', exact: true }),
    ).toBeEnabled();
    await page.getByRole('button', { name: 'Log in', exact: true }).click();
    await expect(
      page.locator('#root').getByText('Signed in as Demo Reader'),
    ).toBeVisible();
    await other.goto('http://127.0.0.1:4173/examples/graphql/client/dist/');
    await other.getByRole('button', { name: 'Log in', exact: true }).click();
    await expect(
      other.locator('#root').getByText('Signed in as Demo Reader'),
    ).toBeVisible();
    await page.getByLabel('Search', { exact: true }).fill(name);
    await expect(page.locator('li')).toHaveCount(0);
    await other
      .getByLabel('URL', { exact: true })
      .fill('https://example.test/learning');
    await other.getByLabel('Description', { exact: true }).fill(name);
    await other.getByRole('button', { name: 'Publish', exact: true }).click();
    await expect(page.getByRole('link', { name, exact: true })).toBeVisible();
    await page.getByRole('button', { name: 'Vote', exact: true }).click();
    await expect(page.locator('li')).toContainText('1 votes');
    await page.getByRole('button', { name: 'Vote', exact: true }).click();
    await expect(page.getByRole('status')).toHaveText('Already voted');
    await page.getByRole('button', { name: 'Log out', exact: true }).click();
    await expect(
      page.getByRole('button', { name: 'Log in', exact: true }),
    ).toBeVisible();
  } finally {
    await other.close();
  }
});
