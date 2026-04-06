import { test, expect } from '@playwright/test';

test.describe('Forms Page - Visual Regression', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/pages/forms/layouts');
    await page.waitForLoadState('domcontentloaded');
    await page.evaluate(() => {
      const overlay = document.getElementById('webpack-dev-server-client-overlay');
      if (overlay) overlay.remove();
    });
    await page.waitForTimeout(1000);
  });

  test('full form layouts page', async ({ page }) => {
    await expect(page).toHaveScreenshot('forms-layouts-full.png', {
      fullPage: true,
    });
  });

  test('inline form card', async ({ page }) => {
    const inlineForm = page.locator('nb-card', { hasText: 'Inline form' });
    await expect(inlineForm).toHaveScreenshot('forms-inline-card.png');
  });

  test('horizontal form card', async ({ page }) => {
    const horizontalForm = page.locator('nb-card', { hasText: 'Horizontal' }).first();
    await expect(horizontalForm).toHaveScreenshot('forms-horizontal-card.png');
  });

  test('form with validation states - empty submit', async ({ page }) => {
    // Capture form in its initial clean state
    const basicForm = page.locator('nb-card', { hasText: 'Basic form' }).first();
    await expect(basicForm).toHaveScreenshot('forms-basic-clean.png');

    // Click submit without filling - shows validation styling
    const submitBtn = basicForm.locator('button[type="submit"]');
    if (await submitBtn.isVisible()) {
      await submitBtn.click();
      await expect(basicForm).toHaveScreenshot('forms-basic-after-submit.png');
    }
  });

  test('form with filled inputs', async ({ page }) => {
    const basicForm = page.locator('nb-card', { hasText: 'Using the Grid' }).first();
    const emailInput = basicForm.locator('input[placeholder*="Email"]').first();
    const passwordInput = basicForm.locator('input[placeholder*="Password"]').first();

    if (await emailInput.isVisible()) {
      await emailInput.fill('test@example.com');
    }
    if (await passwordInput.isVisible()) {
      await passwordInput.fill('SecurePass123');
    }
    await expect(basicForm).toHaveScreenshot('forms-grid-filled.png');
  });
});
