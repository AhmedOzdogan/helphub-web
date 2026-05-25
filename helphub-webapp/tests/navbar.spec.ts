import { expect, Locator, Page, test } from '@playwright/test';
import { DESKTOP_VIEWPORT, MOBILE_VIEWPORT } from './constants/viewports';

async function waitForNavbar(page: Page) {

    await page.goto('/');

    const desktopLogo =
        page.getByTestId('helphub-logo-text-desktop');

    const mobileLogo =
        page.getByTestId('helphub-logo-text-mobile');

    await expect.poll(async () => {

        const desktopVisible =
            await desktopLogo.isVisible().catch(() => false);

        const mobileVisible =
            await mobileLogo.isVisible().catch(() => false);

        return desktopVisible || mobileVisible;

    }, {
        timeout: 20000,
        intervals: [250, 500, 1000],
    }).toBe(true);
}

async function safeClick(locator: Locator) {

    await expect(locator)
        .toBeVisible({ timeout: 15000 });

    await expect(locator)
        .toBeEnabled({ timeout: 15000 });

    for (let attempt = 0; attempt < 3; attempt++) {

        try {

            await locator.click({ timeout: 15000 });

            return;

        } catch {

            if (attempt === 2) {
                throw new Error('Failed to click locator safely');
            }

            await locator.page().waitForTimeout(300);
        }
    }
}

async function hoverWithRetry(locator: Locator) {

    for (let attempt = 0; attempt < 3; attempt++) {

        try {

            await locator.hover();

            return;

        } catch {

            if (attempt === 2) {
                throw new Error('Failed to hover locator safely');
            }

            await locator.page().waitForTimeout(300);
        }
    }
}

async function waitForMenu(menu: Locator) {
    await expect.poll(async () => {
        return await menu.isVisible().catch(() => false);
    }, {
        timeout: 15000,
        intervals: [250, 500, 1000],
    }).toBe(true);

    await expect(menu).toBeVisible({ timeout: 15000 });
}

async function waitForMenuToClose(menu: Locator) {

    await expect.poll(async () => {
        return await menu.isVisible().catch(() => false);
    }, {
        timeout: 15000,
        intervals: [250, 500, 1000],
    }).toBe(false);
}

async function openMobileMenuWithRetry(
    hamburgerButton: Locator,
    mobileMenu: Locator,
) {

    for (let attempt = 0; attempt < 3; attempt++) {

        await safeClick(hamburgerButton);

        try {

            await waitForMenu(mobileMenu);

            return;

        } catch {

            if (attempt === 2) {
                throw new Error(
                    'Failed to open mobile menu after 3 attempts',
                );
            }

            await hamburgerButton.page().waitForTimeout(500);
        }
    }
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

            await hoverWithRetry(trigger);

            await expect(menu).toBeVisible({ timeout: 10000 });

            await page.mouse.move(0, 0);

            await waitForMenuToClose(menu);
        }
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

        const mobileMenu = page.getByTestId('MobileMenu');

        await openMobileMenuWithRetry(
            hamburgerButton,
            mobileMenu,
        );

        await safeClick(hamburgerButton);

        await waitForMenuToClose(mobileMenu);
    });

    test('mobile expandable sections work correctly', async ({ page }) => {
        const hamburgerButton = page.getByTestId('MobileMenuHamburgerButton');

        const mobileMenu = page.getByTestId('MobileMenu');

        await openMobileMenuWithRetry(
            hamburgerButton,
            mobileMenu,
        );

        const forMyselfSection = page.getByTestId('mobile-section-forMyself');

        await forMyselfSection.waitFor({
            state: 'visible',
            timeout: 15000,
        });

        await expect(forMyselfSection).toBeVisible({ timeout: 15000 });

        await safeClick(forMyselfSection);


        await expect(page.getByText(/Individual/i).first()).toBeVisible({ timeout: 10000 });

        await safeClick(forMyselfSection);

    });
});