import { test, expect } from '@playwright/test';

test.describe('Modal Overlays - Visual Regression', () => {

  test('dialog overlay screenshot', async ({ page }) => {
    await page.goto('/pages/modal-overlays/dialog');
    await page.waitForLoadState('domcontentloaded');
    await page.evaluate(() => { document.getElementById('webpack-dev-server-client-overlay')?.remove(); });
    await page.waitForTimeout(1000);

    // Capture the page before opening dialog
    await expect(page).toHaveScreenshot('dialog-page-closed.png');

    // Open a dialog
    const openDialogBtn = page.locator('button', { hasText: /open dialog/i }).first();
    if (await openDialogBtn.isVisible()) {
      await openDialogBtn.click();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot('dialog-page-open.png');
    }
  });

  test('toastr notifications', async ({ page }) => {
    await page.goto('/pages/modal-overlays/toastr');
    await page.waitForLoadState('domcontentloaded');
    await page.evaluate(() => { document.getElementById('webpack-dev-server-client-overlay')?.remove(); });
    await page.waitForTimeout(1000);

    await expect(page).toHaveScreenshot('toastr-page.png');

    // Trigger a toast notification
    const showToastBtn = page.locator('button', { hasText: /show toast/i }).first();
    if (await showToastBtn.isVisible()) {
      await showToastBtn.click();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot('toastr-with-notification.png');
    }
  });

  test('tooltip display on hover', async ({ page }) => {
    await page.goto('/pages/modal-overlays/tooltip');
    await page.waitForLoadState('domcontentloaded');
    await page.evaluate(() => { document.getElementById('webpack-dev-server-client-overlay')?.remove(); });
    await page.waitForTimeout(1000);

    await expect(page).toHaveScreenshot('tooltip-page.png');

    // Hover over a tooltip trigger
    const tooltipTrigger = page.locator('button', { hasText: /tooltip/i }).first();
    if (await tooltipTrigger.isVisible()) {
      await tooltipTrigger.hover();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot('tooltip-visible.png');
    }
  });

  test('popover display', async ({ page }) => {
    await page.goto('/pages/modal-overlays/popover');
    await page.waitForLoadState('domcontentloaded');
    await page.evaluate(() => { document.getElementById('webpack-dev-server-client-overlay')?.remove(); });
    await page.waitForTimeout(1000);

    const popoverBtn = page.locator('button', { hasText: /popover/i }).first();
    if (await popoverBtn.isVisible()) {
      await popoverBtn.click();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot('popover-visible.png');
    }
  });
});
