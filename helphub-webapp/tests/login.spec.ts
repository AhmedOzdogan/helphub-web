import {
    expect,
    Page,
    test,
} from '@playwright/test';
import { DESKTOP_VIEWPORT, MEDIUM_VIEWPORT, MOBILE_VIEWPORT } from './constants/viewports';


const TEST_EMAIL = process.env.testUsername!;
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

async function performLogin(
    page: Page,
    passwordOverride?: string,
) {
    if (!TEST_EMAIL || !TEST_PASSWORD) {
        throw new Error(
            'Missing testUsername or testPassword environment variables'
        );
    }

    await page.goto('/login');

    await page.waitForLoadState('networkidle');

    await page.waitForTimeout(200);

    const emailInput =
        page.getByTestId('login-email-input');

    const passwordInput =
        page.getByTestId('login-password-input');

    const loginButton =
        page.getByTestId('login-button');

    await expect(emailInput).toBeVisible();

    await expect(passwordInput).toBeVisible();

    await fillInputWithRetry(
        emailInput,
        TEST_EMAIL,
    );

    await fillInputWithRetry(
        passwordInput,
        passwordOverride || TEST_PASSWORD,
    );

    for (let attempt = 0; attempt < 3; attempt++) {

        await loginButton.scrollIntoViewIfNeeded();

        await loginButton.click();

        try {

            const loginSuccess =
                page.getByTestId('login-success');

            await loginSuccess.scrollIntoViewIfNeeded();

            await expect(loginSuccess)
                .toBeVisible({
                    timeout: 5000,
                });

            break;

        } catch {

            if (attempt === 2) {
                throw new Error(
                    'Login success message never appeared',
                );
            }

            await page.waitForTimeout(500);
        }
    }
    await expect(page)
        .toHaveURL(/\//, {
            timeout: 10000,
        });
}

async function performInvalidLogin(page: Page) {
    if (!TEST_EMAIL || !TEST_PASSWORD) {
        throw new Error(
            'Missing testUsername or testPassword environment variables'
        );
    }

    await page.goto('/login');

    await page.waitForLoadState('networkidle');

    const emailInput =
        page.getByTestId('login-email-input');

    const passwordInput =
        page.getByTestId('login-password-input');

    const loginButton =
        page.getByTestId('login-button');

    await fillInputWithRetry(
        emailInput,
        TEST_EMAIL,
    );

    await fillInputWithRetry(
        passwordInput,
        'DefinitelyWrongPassword_123_!@#',
    );

    for (let attempt = 0; attempt < 3; attempt++) {

        await loginButton.scrollIntoViewIfNeeded();

        await loginButton.click();

        try {

            const loginError =
                page.getByTestId('login-error');

            await loginError.scrollIntoViewIfNeeded();

            await expect(loginError)
                .toBeVisible({
                    timeout: 5000,
                });

            return;

        } catch {

            if (attempt === 2) {
                throw new Error(
                    'Login error message never appeared',
                );
            }

            await page.waitForTimeout(500);
        }
    }

}

test.describe('Desktop Login', () => {
    test.beforeEach(async ({ page }) => {

        await page.setViewportSize(DESKTOP_VIEWPORT);

    });

    test('desktop account menu login button redirects to login page', async ({ page }) => {

        await page.goto('/');

        await page.waitForLoadState('networkidle');

        const accountMenuButton =
            page.getByRole('button', {
                name: /open account menu|toggle account menu/i,
            }).first();

        await expect(accountMenuButton)
            .toBeVisible({ timeout: 30000 });

        const loginButton =
            page.getByTestId('loginButton');

        for (let attempt = 0; attempt < 3; attempt++) {

            await accountMenuButton.click();

            try {

                await expect(loginButton)
                    .toBeVisible({ timeout: 3000 });

                await loginButton.click();

                await expect(page)
                    .toHaveURL(/\/login/, {
                        timeout: 10000,
                    });

                await expect(
                    page.getByTestId('login-email-input'),
                ).toBeVisible({ timeout: 10000 });

                return;

            } catch {

                if (attempt === 2) {
                    throw new Error(
                        'Failed to open account menu and navigate to login page',
                    );
                }

                await page.waitForTimeout(500);
            }
        }
    });

    test('desktop user can login successfully', async ({ page }) => {
        await performLogin(page);

    });

    test('desktop user sees error for invalid credentials', async ({ page }) => {
        await performInvalidLogin(page);

    });

});


test.describe('Medium Login', () => {

    test.beforeEach(async ({ page }) => {

        await page.setViewportSize(MEDIUM_VIEWPORT);

    });

    test('medium account menu login button redirects to login page', async ({ page }) => {

        await page.goto('/');

        await page.waitForLoadState('networkidle');

        const accountMenuButton =
            page.getByRole('button', {
                name: /open account menu|toggle account menu/i,
            }).first();

        await expect(accountMenuButton)
            .toBeVisible({ timeout: 30000 });

        const loginButton =
            page.getByTestId('loginButton');

        for (let attempt = 0; attempt < 3; attempt++) {

            await accountMenuButton.click();

            try {

                await expect(loginButton)
                    .toBeVisible({ timeout: 3000 });

                await loginButton.click();

                await expect(page)
                    .toHaveURL(/\/login/, {
                        timeout: 10000,
                    });

                await expect(
                    page.getByTestId('login-email-input'),
                ).toBeVisible({ timeout: 10000 });

                return;

            } catch {

                if (attempt === 2) {
                    throw new Error(
                        'Failed to open medium account menu and navigate to login page',
                    );
                }

                await page.waitForTimeout(500);
            }
        }
    });

    test('medium user can login successfully', async ({ page }) => {
        await performLogin(page);

    });

    test('medium user sees error for invalid credentials', async ({ page }) => {
        await performInvalidLogin(page);

    });

});


test.describe('Mobile Login', () => {

    test.beforeEach(async ({ page }) => {

        await page.setViewportSize(MOBILE_VIEWPORT);

    });

    test('mobile account menu login button redirects to login page', async ({ page }) => {

        await page.goto('/');

        await page.waitForLoadState('networkidle');

        const accountMenuButton =
            page.getByRole('button', {
                name: /open account menu|toggle account menu/i,
            }).first();

        await expect(accountMenuButton)
            .toBeVisible({ timeout: 30000 });

        const loginButton =
            page.getByTestId('mobileLoginButton');

        for (let attempt = 0; attempt < 3; attempt++) {

            await accountMenuButton.click();

            try {

                await expect(loginButton)
                    .toBeVisible({ timeout: 3000 });

                await loginButton.click();

                await expect(page)
                    .toHaveURL(/\/login/, {
                        timeout: 10000,
                    });

                await expect(
                    page.getByTestId('login-email-input'),
                ).toBeVisible({ timeout: 10000 });

                return;

            } catch {

                if (attempt === 2) {
                    throw new Error(
                        'Failed to open mobile account menu and navigate to login page',
                    );
                }

                await page.waitForTimeout(500);
            }
        }
    });

    test('mobile user can login successfully', async ({ page }) => {
        await performLogin(page);

    });

    test('mobile user sees error for invalid credentials', async ({ page }) => {
        await performInvalidLogin(page);

    });

});
