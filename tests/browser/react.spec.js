import { test, expect } from '@playwright/test';
for (const variant of ['classic', 'modern']) {
  const url = `/examples/react-${variant}/dist/index.html`;
  test(`${variant}: Todo operations, asynchronous import and route history`, async ({
    page,
  }) => {
    await page.goto(url);
    await page
      .getByRole('textbox', { name: 'New todo' })
      .fill('Read the source');
    await page.getByRole('button', { name: 'Add', exact: true }).click();
    await page.getByRole('checkbox', { name: 'Read the source' }).check();
    await page.getByRole('button', { name: 'Active', exact: true }).click();
    await expect(
      page.getByRole('checkbox', { name: 'Read the source' }),
    ).toHaveCount(0);
    await page.getByRole('button', { name: 'Completed', exact: true }).click();
    await page.getByRole('button', { name: 'Edit', exact: true }).click();
    await page
      .getByRole('textbox', { name: 'Edit todo' })
      .fill('Explain the source');
    await page.getByRole('button', { name: 'Save', exact: true }).click();
    await expect(
      page.getByRole('checkbox', { name: 'Explain the source' }),
    ).toBeChecked();
    await page
      .getByRole('button', { name: 'Clear completed', exact: true })
      .click();
    await page.getByRole('button', { name: 'All', exact: true }).click();
    await page
      .getByRole('button', { name: 'Import examples', exact: true })
      .click();
    await expect(page.getByRole('status')).toHaveText('Imported 2 todos');
    await expect(
      page.getByRole('list', { name: 'Todo list' }).getByRole('listitem'),
    ).toHaveCount(3);
    await page.getByRole('link', { name: 'About', exact: true }).click();
    await expect(
      page.getByRole('heading', { name: 'About this comparison' }),
    ).toBeVisible();
    await page.goBack();
    await expect(
      page.getByRole('checkbox', { name: 'Read a dependency graph' }),
    ).toBeVisible();
    await page.goForward();
    await expect(
      page.getByRole('heading', { name: 'About this comparison' }),
    ).toBeVisible();
  });
  test(`${variant}: a failed import is visible and retryable`, async ({
    page,
  }) => {
    await page.route('**/todos.json', (route) =>
      route.fulfill({ status: 503, body: 'Unavailable' }),
    );
    await page.goto(url);
    await page.getByRole('button', { name: 'Import examples' }).click();
    await expect(page.getByRole('alert')).toContainText('Import failed');
    await page.unroute('**/todos.json');
    await page.getByRole('button', { name: 'Import examples' }).click();
    await expect(page.getByRole('status')).toHaveText('Imported 2 todos');
    await expect(page.getByRole('alert')).toHaveCount(0);
  });
}
test('mini renderer updates one instance at a time', async ({ page }) => {
  await page.goto('/mechanisms/mini-react/index.html');
  await page.getByRole('button', { name: 'First: 0' }).click();
  await expect(page.getByRole('button', { name: 'First: 1' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Second: 0' })).toBeVisible();
});
test('handwritten router handles navigation, back, forward and reload', async ({
  page,
}) => {
  await page.goto('/mechanisms/router/dist/index.html');
  await page.getByRole('link', { name: 'About', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'About view' })).toBeVisible();
  await page.goBack();
  await expect(page.getByRole('heading', { name: 'Home view' })).toBeVisible();
  await page.goForward();
  await page.reload();
  await expect(page.getByRole('heading', { name: 'About view' })).toBeVisible();
});
