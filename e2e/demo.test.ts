import { expect, test } from '@playwright/test';

test('home page has expected button', async ({ page }) => {
	await page.goto('/todos');
	await expect(page.locator('.btn-blue')).toBeVisible();
});
