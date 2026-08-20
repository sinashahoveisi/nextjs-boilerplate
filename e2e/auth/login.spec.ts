import {test, expect} from '@playwright/test';

test.describe('login page', () => {
  test('renders login form fields', async ({page}) => {
    await page.goto('/auth/login');

    await expect(page.getByRole('heading', {name: 'Login'})).toBeVisible();
    await expect(page.getByLabel('Phone number')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
    await expect(page.getByRole('button', {name: 'Login'})).toBeVisible();
  });

  test('shows validation errors for empty submit', async ({page}) => {
    await page.goto('/auth/login');

    // Wait for client handlers (Mobile Safari can submit natively before hydration).
    const form = page.getByTestId('login-form');
    await expect(form).toHaveAttribute('data-hydrated', 'true');

    await page.getByRole('button', {name: 'Login'}).click();

    await expect(page.getByText(/phone number is required/i)).toBeVisible();
    await expect(page.getByText(/please enter your password/i)).toBeVisible();
  });

  test('can navigate back home', async ({page}) => {
    await page.goto('/auth/login');
    await page.getByRole('link', {name: /back to home/i}).click();
    await expect(page).toHaveURL('/');
  });
});
