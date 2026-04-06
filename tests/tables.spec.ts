import { test, expect } from '@playwright/test';

test.describe('Smart Table - Visual Regression', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/pages/tables/smart-table');
    await page.waitForLoadState('domcontentloaded');
    await page.evaluate(() => { document.getElementById('webpack-dev-server-client-overlay')?.remove(); });
    await page.waitForTimeout(1000);
  });

  test('full table page screenshot', async ({ page }) => {
    await expect(page).toHaveScreenshot('smart-table-full.png', {
      fullPage: true,
    });
  });

  test('table component only', async ({ page }) => {
    const table = page.locator('ng2-smart-table').first();
    await expect(table).toHaveScreenshot('smart-table-component.png');
  });

  test('table after filtering', async ({ page }) => {
    // Type into a filter input (first column header filter)
    const filterInput = page.locator('ng2-smart-table input').first();
    if (await filterInput.isVisible()) {
      await filterInput.fill('jack');
      await page.waitForTimeout(500);
      await expect(page.locator('ng2-smart-table').first()).toHaveScreenshot('smart-table-filtered.png');
    }
  });
});
