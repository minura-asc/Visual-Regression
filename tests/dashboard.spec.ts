import { test, expect } from '@playwright/test';

test.describe('Dashboard - Visual Regression', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/pages/iot-dashboard');
    await page.waitForLoadState('domcontentloaded');
    // Remove webpack dev server overlay that intercepts clicks
    await page.evaluate(() => {
      const overlay = document.getElementById('webpack-dev-server-client-overlay');
      if (overlay) overlay.remove();
    });
    await page.waitForTimeout(3000); // allow chart animations to settle
  });

  test('full page screenshot', async ({ page }) => {
    await expect(page).toHaveScreenshot('dashboard-full-page.png', {
      fullPage: true,
    });
  });

  test('sidebar navigation', async ({ page }) => {
    const sidebar = page.locator('nb-sidebar');
    await expect(sidebar).toHaveScreenshot('dashboard-sidebar.png');
  });

  test('header area', async ({ page }) => {
    const header = page.locator('nb-layout-header');
    await expect(header).toHaveScreenshot('dashboard-header.png');
  });

  test('status cards section', async ({ page }) => {
    const statusCards = page.locator('ngx-status-card').first();
    await expect(statusCards).toHaveScreenshot('dashboard-status-card.png');
  });

  test('electricity chart component', async ({ page }) => {
    const electricitySection = page.locator('ngx-electricity');
    if (await electricitySection.isVisible()) {
      await expect(electricitySection).toHaveScreenshot('dashboard-electricity.png');
    }
  });

  test('theme switch - dark vs default', async ({ page }) => {
    // Capture default theme
    await expect(page).toHaveScreenshot('dashboard-default-theme.png', { fullPage: true });

    // Toggle to dark theme via the theme switcher
    const themeSwitcher = page.locator('nb-select').filter({ hasText: 'Light' });
    if (await themeSwitcher.count() > 0) {
      await themeSwitcher.click();
      const darkOption = page.locator('nb-option', { hasText: 'Dark' });
      await darkOption.waitFor({ state: 'visible', timeout: 3000 });
      if (await darkOption.isVisible()) {
        await darkOption.click();
        await page.waitForTimeout(1000);
        await expect(page).toHaveScreenshot('dashboard-dark-theme.png', { fullPage: true });
      }
    }
  });
});
