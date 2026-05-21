import { expect, test } from '@playwright/test';
import {
    DESKTOP_VIEWPORT,
    MEDIUM_VIEWPORT,
    MOBILE_VIEWPORT,
} from './constants/viewports';

const BASE_URL =
    process.env.PLAYWRIGHT_TEST_BASE_URL ||
    'http://localhost:8081';

const TEST_PASSWORD = process.env.testPassword!;

function generateTestEmail() {

    const now = new Date();

    const randomId = Math.random()
        .toString(36)
        .substring(2, 10);

    const timestamp = `${now.getFullYear()
        }-${String(now.getMonth() + 1).padStart(2, '0')
        }-${String(now.getDate()).padStart(2, '0')
        }-${String(now.getHours()).padStart(2, '0')
        }-${String(now.getMinutes()).padStart(2, '0')
        }-${String(now.getSeconds()).padStart(2, '0')
        }`;

    return `playwright-${timestamp}-${randomId}@gmail.com`;
}

async function navigateToSignup(page: any) {

    await page.goto(BASE_URL);

    await page.waitForLoadState('networkidle');

    await page.goto(`${BASE_URL}/signup`);

    await page.waitForLoadState('networkidle');
}

async function performSignup(page: any) {

    if (!TEST_PASSWORD) {
        throw new Error(
            'Missing testPassword environment variable'
        );
    }

    const testEmail = generateTestEmail();

    const nameInput =
        page.getByTestId('signup-name-input');

    const emailInput =
        page.getByTestId('signup-email-input');

    const passwordInput =
        page.getByTestId('signup-password-input');

    const confirmPasswordInput =
        page.getByTestId('signup-confirm-password-input');

    const signupButton =
        page.getByTestId('signup-button');

    await nameInput.fill('Playwright User');

    await expect(nameInput)
        .toHaveValue('Playwright User');

    await emailInput.fill(testEmail);

    await expect(emailInput)
        .toHaveValue(testEmail);

    await passwordInput.fill(TEST_PASSWORD);

    await expect(passwordInput)
        .toHaveValue(TEST_PASSWORD);

    await confirmPasswordInput.fill(TEST_PASSWORD);

    await expect(confirmPasswordInput)
        .toHaveValue(TEST_PASSWORD);

    await signupButton.click();

    await expect(
        page.getByTestId('signup-success')
    ).toBeVisible({
        timeout: 10000,
    });
}

async function performInvalidSignup(page: any) {

    const signupButton =
        page.getByTestId('signup-button');

    await signupButton.click();

    await expect(
        page.getByTestId('signup-error')
    ).toBeVisible({
        timeout: 10000,
    });
}


test.describe('Desktop Signup', () => {

    test.beforeEach(async ({ page }) => {

        await page.setViewportSize(DESKTOP_VIEWPORT);

    });

    test('desktop user can signup successfully', async ({ page }) => {

        await navigateToSignup(page);

        await performSignup(page);

    });

    test('desktop user sees error for empty signup fields', async ({ page }) => {

        await navigateToSignup(page);

        await performInvalidSignup(page);

    });

});


test.describe('Medium Signup', () => {

    test.beforeEach(async ({ page }) => {

        await page.setViewportSize(MEDIUM_VIEWPORT);

    });

    test('medium user can signup successfully', async ({ page }) => {

        await navigateToSignup(page);

        await performSignup(page);

    });

    test('medium user sees error for empty signup fields', async ({ page }) => {

        await navigateToSignup(page);

        await performInvalidSignup(page);

    });

});


test.describe('Mobile Signup', () => {

    test.beforeEach(async ({ page }) => {

        await page.setViewportSize(MOBILE_VIEWPORT);

    });

    test('mobile user can signup successfully', async ({ page }) => {

        await navigateToSignup(page);

        await performSignup(page);

    });

    test('mobile user sees error for empty signup fields', async ({ page }) => {

        await navigateToSignup(page);

        await performInvalidSignup(page);

    });

});
