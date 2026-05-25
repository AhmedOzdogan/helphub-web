import { expect, test } from '@playwright/test';
import { DESKTOP_VIEWPORT, MEDIUM_VIEWPORT, MOBILE_VIEWPORT } from './constants/viewports';

async function waitForNavbar(page: any) {
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.waitForLoadState('domcontentloaded');
    await page.waitForLoadState('networkidle');
    
    const desktopLogo = page.getByTestId('helphub-logo-text-desktop');
    const mobileLogo = page.getByTestId('helphub-logo-text-mobile');

    const desktopVisible = await desktopLogo.isVisible({ timeout: 20000 }).catch(() => false);
    const mobileVisible = await mobileLogo.isVisible({ timeout: 20000 }).catch(() => false);

    expect(desktopVisible || mobileVisible).toBeTruthy();
}

async function safeClick(locator: any) {
    await expect(locator).toBeVisible({ timeout: 15000 });

    await expect(locator).toBeEnabled({ timeout: 15000 });

    await locator.click({ timeout: 15000 });
}

async function waitForMenu(menu: any) {
    await expect.poll(async () => {
        return await menu.isVisible().catch(() => false);
    }, {
        timeout: 15000,
        intervals: [250, 500, 1000],
    }).toBe(true);

    await expect(menu).toBeVisible({ timeout: 15000 });
}

test.describe('Navbar Desktop', () => {
    test.beforeEach(async ({ page }) => {
        await page.setViewportSize(DESKTOP_VIEWPORT);
        await waitForNavbar(page);
    });

    test('desktop navbar elements are visible and positioned correctly', async ({ page }) => {
        const logo = page.getByTestId('helphub-logo-text-desktop');
        const searchBar = page.getByTestId('searchBar');
        const accountButton = page.getByLabel('Open account menu');
        const dropdownMenu = page.getByTestId('Dropdown-web-menu');

        await expect(logo).toBeVisible({ timeout: 10000 });
        await expect(searchBar).toBeVisible({ timeout: 10000 });
        await expect(accountButton).toBeVisible({ timeout: 10000 });
        await expect(dropdownMenu).toBeVisible({ timeout: 10000 });

        await expect.poll(async () => {
            const logoBox = await logo.first().boundingBox();
            const searchBox = await searchBar.first().boundingBox();
            const accountBox = await accountButton.first().boundingBox();

            return Boolean(logoBox && searchBox && accountBox);
        }, {
            timeout: 15000,
            intervals: [250, 500, 1000],
        }).toBe(true);

        const logoBox = await logo.first().boundingBox();
        const searchBox = await searchBar.first().boundingBox();
        const accountBox = await accountButton.first().boundingBox();

        expect(logoBox).not.toBeNull();
        expect(searchBox).not.toBeNull();
        expect(accountBox).not.toBeNull();

        if (logoBox && searchBox && accountBox) {
            expect(searchBox.x).toBeGreaterThan(logoBox.x);
            expect(accountBox.x).toBeGreaterThan(searchBox.x);
        }
    });

    test('account dropdown opens and closes safely', async ({ page }) => {

        const accountButton = page.getByLabel('Open account menu');

        await accountButton.hover();

        const loginButton = page.getByTestId('loginButton');

        const signUpButton = page.getByTestId('signUpButton');

        await expect(loginButton).toBeVisible({ timeout: 10000 });

        await expect(signUpButton).toBeVisible({ timeout: 10000 });

        await page.mouse.move(0, 0);

        await expect.poll(async () => {
            return await loginButton.isVisible().catch(() => false);
        }, {
            timeout: 15000,
            intervals: [250, 500, 1000],
        }).toBe(false);
    });

    test('mega menu dropdowns open on hover', async ({ page }) => {

        const dropdowns = [
            {
                triggerId: 'for-myself-dropdown',
                menuId: 'mega-menu-forMyself',
            },
            {
                triggerId: 'for-moms-and-kids-dropdown',
                menuId: 'mega-menu-forMomsAndKids',
            },
            {
                triggerId: 'for-work-dropdown',
                menuId: 'mega-menu-forWork',
            },
            {
                triggerId: 'group-therapies-dropdown',
                menuId: 'mega-menu-groupTherapies',
            },
        ];

        for (const item of dropdowns) {

            const trigger = page.getByTestId(item.triggerId);

            const menu = page.getByTestId(item.menuId);

            await expect(trigger).toBeVisible();

            await trigger.hover();

            await expect(menu).toBeVisible({ timeout: 10000 });

            await page.mouse.move(0, 0);

            await expect.poll(async () => {
                return await menu.isVisible().catch(() => false);
            }, {
                timeout: 15000,
                intervals: [250, 500, 1000],
            }).toBe(false);
        }
    });

    test('Desktop language menu opens and closes correctly', async ({ page }) => {

        const desktopLanguageButton =
            page.getByTestId('desktop-language-button');

        const desktopLanguageMenu =
            page.getByTestId('desktop-language-menu');

        await safeClick(desktopLanguageButton);

        await waitForMenu(desktopLanguageMenu);

        await expect(

            desktopLanguageMenu.getByText('English')

        ).toBeVisible();;

        await expect(desktopLanguageMenu.getByText('Deutsch')).toBeVisible();

        await expect(desktopLanguageMenu.getByText('Français')).toBeVisible();

        await expect(desktopLanguageMenu.getByText('Español')).toBeVisible();

        await expect(desktopLanguageMenu.getByText('Italiano')).toBeVisible();

        await safeClick(desktopLanguageButton);

        await expect.poll(async () => {
            return await desktopLanguageMenu.isVisible().catch(() => false);
        }, {
            timeout: 15000,
            intervals: [250, 500, 1000],
        }).toBe(false);

    });

    test('login and signup buttons navigate to correct pages', async ({ page }) => {

        const accountButton = page.getByLabel('Open account menu');

        // Login navigation
        await accountButton.hover();

        const loginButton = page.getByTestId('loginButton');

        await expect(loginButton).toBeVisible({
            timeout: 10000
        });

        await loginButton.click();

        await expect(page).toHaveURL(/\/login$/);

        // Go back to homepage
        await page.goto('/');

        await page.waitForLoadState('domcontentloaded');

        // Signup navigation
        const accountButtonAgain = page.getByLabel('Open account menu');

        await accountButtonAgain.hover();

        const signUpButton = page.getByTestId('signUpButton');

        await expect(signUpButton).toBeVisible({
            timeout: 10000
        });

        await signUpButton.click();

        await expect(page).toHaveURL(/\/signup$/);

    });
});

test.describe('Medium Navbar', () => {
    test.beforeEach(async ({ page }) => {
        await page.setViewportSize(MEDIUM_VIEWPORT);
        await waitForNavbar(page)
    });

    test.describe('Medium Navbar', () => {

        test.beforeEach(async ({ page }) => {

            await page.setViewportSize(MEDIUM_VIEWPORT);

            await waitForNavbar(page);

        });

        test('Medium language menu opens and closes correctly', async ({ page }) => {

            const mediumLanguageButton =
                page.getByTestId('medium-language-button');

            const mediumLanguageMenu =
                page.getByTestId('medium-language-menu');

            await safeClick(mediumLanguageButton);

            await waitForMenu(mediumLanguageMenu);

            // Medium navbar only shows flags
            await expect(
                mediumLanguageMenu.getByTestId('en')
            ).toBeVisible();

            await expect(
                mediumLanguageMenu.getByTestId('de')
            ).toBeVisible();

            await expect(
                mediumLanguageMenu.getByTestId('fr')
            ).toBeVisible();

            await expect(
                mediumLanguageMenu.getByTestId('es')
            ).toBeVisible();

            await expect(
                mediumLanguageMenu.getByTestId('it')
            ).toBeVisible();

            await mediumLanguageButton.click();

            await expect.poll(async () => {
                return await mediumLanguageMenu.isVisible().catch(() => false);
            }, {
                timeout: 15000,
                intervals: [250, 500, 1000],
            }).toBe(false);

        });
    });
});

test.describe('Navbar Mobile', () => {
    test.beforeEach(async ({ page }) => {
        await page.setViewportSize(MOBILE_VIEWPORT);
        await waitForNavbar(page);
    });

    test('mobile navbar renders correctly', async ({ page }) => {
        const hamburgerButton = page.getByTestId('MobileMenuHamburgerButton');
        const mobileSearch = page.getByTestId('mobile-search-input');

        await expect(hamburgerButton).toBeVisible({ timeout: 10000 });
        await expect(mobileSearch).toBeVisible({ timeout: 10000 });
    });

    test('mobile menu opens and closes safely', async ({ page }) => {
        const hamburgerButton = page.getByTestId('MobileMenuHamburgerButton');

        await safeClick(hamburgerButton);

        const mobileMenu = page.getByTestId('MobileMenu');

        await waitForMenu(mobileMenu);

        await safeClick(hamburgerButton);

        await expect.poll(async () => {
            return await mobileMenu.isVisible().catch(() => false);
        }, {
            timeout: 15000,
            intervals: [250, 500, 1000],
        }).toBe(false);
    });

    test('mobile expandable sections work correctly', async ({ page }) => {
        const hamburgerButton = page.getByTestId('MobileMenuHamburgerButton');

        await safeClick(hamburgerButton);

        const forMyselfSection = page.getByTestId('mobile-section-forMyself');

        await forMyselfSection.waitFor({
            state: 'visible',
            timeout: 15000,
        });

        await expect(forMyselfSection).toBeVisible({ timeout: 15000 });

        await forMyselfSection.click();

        await page.waitForTimeout(350);

        await expect(page.getByText(/Individual/i).first()).toBeVisible({ timeout: 10000 });

        await forMyselfSection.click();

    });

    test('mobile account menu opens correctly', async ({ page }) => {
        const accountButton = page.getByLabel('Toggle account menu');

        await safeClick(accountButton);

        const mobileAccountMenu = page.getByTestId('mobile-account-menu');

        await waitForMenu(mobileAccountMenu);

        await expect(page.getByTestId('mobileLoginButton')).toBeVisible({ timeout: 10000 });
        await expect(page.getByTestId('mobileSignUpButton')).toBeVisible({ timeout: 10000 });
    });
});