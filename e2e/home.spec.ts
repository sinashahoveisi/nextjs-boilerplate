import {test, expect} from '@playwright/test';

test.describe('home page', () => {
  test('shows the startup template and login link', async ({page}) => {
    await page.goto('/');

    await expect(page.getByRole('heading', {name: /to get started/i})).toBeVisible();
    await expect(page.getByRole('link', {name: 'Deploy Now'})).toBeVisible();
    await expect(page.getByRole('link', {name: 'Documentation'})).toBeVisible();
    await expect(page.getByRole('link', {name: 'Login'})).toBeVisible();
  });

  test('navigates to the login page', async ({page}) => {
    await page.goto('/');
    await page.getByRole('link', {name: 'Login'}).click();
    await expect(page).toHaveURL(/\/auth\/login/);
    await expect(page.getByRole('heading', {name: 'Login'})).toBeVisible();
  });
});
