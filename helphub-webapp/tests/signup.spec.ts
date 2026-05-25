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

async function fillInputWithRetry(
    input: any,
    value: string,
) {

    for (let attempt = 0; attempt < 3; attempt++) {

        await input.fill(value);

        await input.scrollIntoViewIfNeeded();

        try {

            await expect(input)
                .toHaveValue(value, {
                    timeout: 2000,
                });

            return;

        } catch {

            if (attempt === 2) {
                throw new Error(
                    `Failed to fill input with value: ${value}`,
                );
            }

            await input.clear();

            await input.page().waitForTimeout(300);
        }
    }
}

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

    await page.goto('/');

    await page.waitForLoadState('networkidle');

    await page.goto('/signup');

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

    await fillInputWithRetry(
        nameInput,
        'Playwright User',
    );

    await fillInputWithRetry(
        emailInput,
        testEmail,
    );

    await fillInputWithRetry(
        passwordInput,
        TEST_PASSWORD,
    );

    await fillInputWithRetry(
        confirmPasswordInput,
        TEST_PASSWORD,
    );

    for (let attempt = 0; attempt < 3; attempt++) {

        await signupButton.scrollIntoViewIfNeeded();

        await signupButton.click();

        try {

            const signupSuccess =
                page.getByTestId('signup-success');

            await signupSuccess.scrollIntoViewIfNeeded();

            await expect(signupSuccess)
                .toBeVisible({
                    timeout: 5000,
                });

            return;

        } catch {

            if (attempt === 2) {
                throw new Error(
                    'Signup success message never appeared',
                );
            }

            await page.waitForTimeout(500);
        }
    }
}

async function performInvalidSignup(page: any) {

    const signupButton =
        page.getByTestId('signup-button');

    await signupButton.click();

    await page.mouse.wheel(0, 600);

    await page.waitForTimeout(200);

    await page.getByTestId('signup-error')
        .scrollIntoViewIfNeeded();

    await expect(
        page.getByTestId('signup-error')
    ).toBeVisible({
        timeout: 10000,
    });
}


async function verifySignupRedirect(
    page: any,
    signupButtonTestId: string,
) {

    await page.goto('/');

    await page.waitForLoadState('networkidle');

    const accountMenuButton =
        page.getByRole('button', {
            name: /open account menu|toggle account menu/i,
        }).first();

    await expect(accountMenuButton)
        .toBeVisible({ timeout: 30000 });

    const signupButton =
        page.getByTestId(signupButtonTestId);

    for (let attempt = 0; attempt < 3; attempt++) {

        try {

            await accountMenuButton.click();

            await expect(signupButton)
                .toBeVisible({ timeout: 5000 });

            await signupButton.click();

            await expect(page)
                .toHaveURL(/\/signup/, {
                    timeout: 10000,
                });

            await expect(
                page.getByTestId('signup-name-input'),
            ).toBeVisible({ timeout: 10000 });

            return;

        } catch {

            if (attempt === 2) {
                throw new Error(
                    `Failed to navigate to signup page using ${signupButtonTestId}`,
                );
            }
        }
    }
}

test.describe('Desktop Signup', () => {

    test.beforeEach(async ({ page }) => {

        await page.setViewportSize(DESKTOP_VIEWPORT);

    });

    test('desktop signup button redirects to signup page', async ({ page }) => {

        await verifySignupRedirect(
            page,
            'signUpButton',
        );

    });

    test('desktop user can signup successfully', async ({ page }) => {

        await navigateToSignup(page);

        await page.waitForTimeout(200);

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

    test('medium signup button redirects to signup page', async ({ page }) => {

        await verifySignupRedirect(
            page,
            'signUpButton',
        );

    });

    test('medium user can signup successfully', async ({ page }) => {

        await navigateToSignup(page);

        await page.waitForTimeout(200);

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

    test('mobile signup button redirects to signup page', async ({ page }) => {

        await verifySignupRedirect(
            page,
            'mobileSignUpButton',
        );

    });

    test('mobile user can signup successfully', async ({ page }) => {

        await navigateToSignup(page);

        await page.waitForTimeout(200);

        await performSignup(page);

    });

    test('mobile user sees error for empty signup fields', async ({ page }) => {

        await navigateToSignup(page);

        await performInvalidSignup(page);

    });

});
