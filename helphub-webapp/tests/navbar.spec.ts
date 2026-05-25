import { expect, test } from '@playwright/test';
import { DESKTOP_VIEWPORT, MEDIUM_VIEWPORT, MOBILE_VIEWPORT } from './constants/viewports';

async function waitForNavbar(page: any) {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const desktopLogo = page.getByTestId('helphub-logo-text-desktop');
    const mobileLogo = page.getByTestId('helphub-logo-text-mobile');

    const desktopVisible = await desktopLogo.isVisible().catch(() => false);
    const mobileVisible = await mobileLogo.isVisible().catch(() => false);

    expect(desktopVisible || mobileVisible).toBeTruthy();
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

        await logo.scrollIntoViewIfNeeded();
        await searchBar.scrollIntoViewIfNeeded();
        await accountButton.scrollIntoViewIfNeeded();

        await page.waitForTimeout(500);

        const logoBox = await logo.boundingBox();
        const searchBox = await searchBar.boundingBox();
        const accountBox = await accountButton.boundingBox();

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

        await page.waitForTimeout(400);

        await expect(loginButton).toHaveCount(0);

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

            await expect(menu).toHaveCount(0);
        }
    });

    test('Desktop language menu opens and closes correctly', async ({ page }) => {

        const desktopLanguageButton =
            page.getByTestId('desktop-language-button');

        const desktopLanguageMenu =
            page.getByTestId('desktop-language-menu');

        await expect(desktopLanguageButton)
            .toBeVisible({ timeout: 10000 });

        await desktopLanguageButton.scrollIntoViewIfNeeded();

        await desktopLanguageButton.click({ force: true });

        await page.waitForTimeout(1000);

        await expect(desktopLanguageMenu)
            .toBeAttached({ timeout: 10000 });

        await expect(desktopLanguageMenu).toBeVisible({
            timeout: 10000
        });

        await expect(

            desktopLanguageMenu.getByText('English')

        ).toBeVisible();;

        await expect(desktopLanguageMenu.getByText('Deutsch')).toBeVisible();

        await expect(desktopLanguageMenu.getByText('Français')).toBeVisible();

        await expect(desktopLanguageMenu.getByText('Español')).toBeVisible();

        await expect(desktopLanguageMenu.getByText('Italiano')).toBeVisible();

        await desktopLanguageButton.click();

        await expect(desktopLanguageMenu).toHaveCount(0);

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

        await page.waitForLoadState('networkidle');

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

            await mediumLanguageButton.click();

            await expect(mediumLanguageMenu).toBeVisible({
                timeout: 1000
            });

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

            await expect(mediumLanguageMenu).toHaveCount(0);

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

        await expect(hamburgerButton)
            .toBeVisible({ timeout: 10000 });

        await hamburgerButton.scrollIntoViewIfNeeded();

        await hamburgerButton.click({ force: true });

        await page.waitForTimeout(1000);

        const mobileMenu = page.getByTestId('MobileMenu');

        await expect(mobileMenu)
            .toBeAttached({ timeout: 10000 });

        await expect(mobileMenu)
            .toBeVisible({ timeout: 10000 });

        await page.waitForTimeout(400);

        await hamburgerButton.click({ force: true });

        await expect(mobileMenu).not.toBeVisible({ timeout: 10000 });
    });

    test('mobile expandable sections work correctly', async ({ page }) => {
        const hamburgerButton = page.getByTestId('MobileMenuHamburgerButton');

        await expect(hamburgerButton)
            .toBeVisible({ timeout: 10000 });

        await hamburgerButton.scrollIntoViewIfNeeded();

        await hamburgerButton.click({ force: true });

        await page.waitForTimeout(1000);

        const forMyselfSection = page.getByTestId('mobile-section-forMyself');

        await expect(forMyselfSection).toBeVisible({ timeout: 10000 });

        await forMyselfSection.click();

        await page.waitForTimeout(350);

        await expect(page.getByText(/Individual/i).first()).toBeVisible({ timeout: 10000 });

        await forMyselfSection.click();

        await page.waitForTimeout(350);
    });

    test('mobile account menu opens correctly', async ({ page }) => {
        const accountButton = page.getByLabel('Toggle account menu');

        await expect(accountButton)
            .toBeVisible({ timeout: 10000 });

        await accountButton.scrollIntoViewIfNeeded();

        await accountButton.click({ force: true });

        await page.waitForTimeout(1000);

        const mobileAccountMenu = page.getByTestId('mobile-account-menu');

        await expect(mobileAccountMenu)
            .toBeAttached({ timeout: 10000 });

        await expect(mobileAccountMenu)
            .toBeVisible({ timeout: 10000 });

        await expect(page.getByTestId('mobileLoginButton')).toBeVisible({ timeout: 10000 });
        await expect(page.getByTestId('mobileSignUpButton')).toBeVisible({ timeout: 10000 });
    });
});