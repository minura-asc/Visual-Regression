import { test, expect } from '@playwright/test';

test.describe('Responsive Visual Regression', () => {

  test('dashboard at desktop viewport (1280x720)', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 720 },
    });
    const page = await context.newPage();
    await page.goto('/pages/iot-dashboard');
    await page.waitForLoadState('domcontentloaded');
    await page.evaluate(() => { document.getElementById('webpack-dev-server-client-overlay')?.remove(); });
    await page.waitForTimeout(3000);

    await expect(page).toHaveScreenshot('dashboard-desktop-1280x720.png', {
      fullPage: true,
    });
    await context.close();
  });

  test('dashboard at tablet viewport (768x1024)', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 768, height: 1024 },
    });
    const page = await context.newPage();
    await page.goto('/pages/iot-dashboard');
    await page.waitForLoadState('domcontentloaded');
    await page.evaluate(() => { document.getElementById('webpack-dev-server-client-overlay')?.remove(); });
    await page.waitForTimeout(3000);

    await expect(page).toHaveScreenshot('dashboard-tablet-768x1024.png', {
      fullPage: true,
    });
    await context.close();
  });

  test('dashboard at mobile viewport (375x667)', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 375, height: 667 },
    });
    const page = await context.newPage();
    await page.goto('/pages/iot-dashboard');
    await page.waitForLoadState('domcontentloaded');
    await page.evaluate(() => { document.getElementById('webpack-dev-server-client-overlay')?.remove(); });
    await page.waitForTimeout(3000);

    await expect(page).toHaveScreenshot('dashboard-mobile-375x667.png', {
      fullPage: true,
    });
    await context.close();
  });

  test('forms page at mobile viewport', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 375, height: 667 },
    });
    const page = await context.newPage();
    await page.goto('/pages/forms/layouts');
    await page.waitForLoadState('domcontentloaded');
    await page.evaluate(() => { document.getElementById('webpack-dev-server-client-overlay')?.remove(); });
    await page.waitForTimeout(1000);

    await expect(page).toHaveScreenshot('forms-mobile-375x667.png', {
      fullPage: true,
    });
    await context.close();
  });
});
