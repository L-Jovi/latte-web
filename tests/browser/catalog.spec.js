import {test,expect} from '@playwright/test';
import {readFileSync} from 'node:fs';
const catalog=JSON.parse(readFileSync('docs/catalog.json','utf8'));
for (const entry of catalog) for (const path of entry.pages || []) {
  test(`loads ${path}`, async ({page}) => {
    const errors=[];
    page.on('pageerror',error=>errors.push(error.message));
    page.on('response',response=>{if(response.status()>=400)errors.push(`${response.status()} ${response.url()}`)});
    const response=await page.goto('/'+path);
    expect(response.status()).toBe(200);
    await expect(page.locator('body')).toBeVisible();
    await page.waitForTimeout(100);
    expect(errors).toEqual([]);
  });
}
test('learning index links to experiments',async({page})=>{
  await page.goto('/'); await expect(page.getByRole('heading',{name:'latte-web'})).toBeVisible();
  await page.getByRole('link',{name:'Promise: three steps'}).click();
  await expect(page.locator('output')).toHaveText('1,2');
});
