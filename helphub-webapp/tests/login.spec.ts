import { expect, test } from '@playwright/test';
import { DESKTOP_VIEWPORT, MEDIUM_VIEWPORT, MOBILE_VIEWPORT } from './constants/viewports';


const TEST_EMAIL = process.env.testUsername!;
const TEST_PASSWORD = process.env.testPassword!;

async function navigateToLogin(page: any) {

    await page.goto('/');

    await page.waitForLoadState('networkidle');

    await page.goto('/login');

    await page.waitForLoadState('networkidle');
}

async function performLogin(
    page: any,
    passwordOverride?: string,
) {
    if (!TEST_EMAIL || !TEST_PASSWORD) {
        throw new Error(
            'Missing testUsername or testPassword environment variables'
        );
    }

    const emailInput =
        page.getByTestId('login-email-input');

    const passwordInput =
        page.getByTestId('login-password-input');

    const loginButton =
        page.getByTestId('login-button');

    await expect(emailInput).toBeVisible();

    await expect(passwordInput).toBeVisible();

    await emailInput.focus();

    await emailInput.fill(TEST_EMAIL);

    await expect(emailInput)
        .toHaveValue(TEST_EMAIL);

    await passwordInput.focus();

    await passwordInput.fill(
        passwordOverride || TEST_PASSWORD
    );

    await expect(passwordInput)
        .toHaveValue(passwordOverride || TEST_PASSWORD);

    await loginButton.click();

    await expect(
        page.getByTestId('login-success')
    ).toBeVisible({
        timeout: 10000,
    });
}

async function performInvalidLogin(page: any) {
    if (!TEST_EMAIL || !TEST_PASSWORD) {
        throw new Error(
            'Missing testUsername or testPassword environment variables'
        );
    }

    const emailInput =
        page.getByTestId('login-email-input');

    const passwordInput =
        page.getByTestId('login-password-input');

    const loginButton =
        page.getByTestId('login-button');

    await emailInput.focus();

    await emailInput.fill(TEST_EMAIL);

    await passwordInput.focus();

    await passwordInput.fill('wrongpassword123');

    await loginButton.click();

    await expect(
        page.getByTestId('login-error')
    ).toBeVisible({
        timeout: 10000,
    });

}

test.describe('Desktop Login', () => {

    test.beforeEach(async ({ page }) => {

        await page.setViewportSize(DESKTOP_VIEWPORT);

    });

    test('desktop user can login successfully', async ({ page }) => {

        await navigateToLogin(page);

        await performLogin(page);

    });

    test('desktop user sees error for invalid credentials', async ({ page }) => {

        await navigateToLogin(page);

        await performInvalidLogin(page);

    });

});


test.describe('Medium Login', () => {

    test.beforeEach(async ({ page }) => {

        await page.setViewportSize(MEDIUM_VIEWPORT);

    });

    test('medium user can login successfully', async ({ page }) => {

        await navigateToLogin(page);

        await performLogin(page);

    });

    test('medium user sees error for invalid credentials', async ({ page }) => {

        await navigateToLogin(page);

        await performInvalidLogin(page);

    });

});


test.describe('Mobile Login', () => {

    test.beforeEach(async ({ page }) => {

        await page.setViewportSize(MOBILE_VIEWPORT);

    });

    test('mobile user can login successfully', async ({ page }) => {

        await navigateToLogin(page);

        await performLogin(page);

    });

    test('mobile user sees error for invalid credentials', async ({ page }) => {

        await navigateToLogin(page);

        await performInvalidLogin(page);

    });

});
