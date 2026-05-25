import { expect, test } from '@playwright/test';
import {
    DESKTOP_VIEWPORT,
    MEDIUM_VIEWPORT,
    MOBILE_VIEWPORT,
} from './constants/viewports';


async function waitForNavbar(page: any) {

    await page.goto('/');

    await page.waitForLoadState('networkidle');

    const desktopLogo = page.getByTestId('helphub-logo-text-desktop');
    const mobileLogo = page.getByTestId('helphub-logo-text-mobile');

    const desktopVisible = await desktopLogo.isVisible().catch(() => false);
    const mobileVisible = await mobileLogo.isVisible().catch(() => false);

    expect(desktopVisible || mobileVisible).toBeTruthy();
}

async function openLanguageMenu(
    languageButton: any,
    languageMenu: any,
) {

    await languageButton.click();

    await expect(languageMenu)
        .toBeVisible({ timeout: 5000 });

    await languageButton.page().waitForTimeout(500);
}

async function checkLanguagePersistence(
    page: any,
    assertion: () => Promise<void>,
    loginAssertion: () => Promise<void>,
) {

    // Current index page
    await assertion();

    // Refresh index page and check again
    await page.reload();

    await page.waitForLoadState('networkidle');

    await assertion();

    // Navigate to login page
    await page.goto('/login');

    await page.waitForLoadState('networkidle');

    // Check login page translation
    await loginAssertion();

    // Return home page
    await page.goto('/');

    await page.waitForLoadState('networkidle');
}

test.describe('Language Switching on Desktop', () => {

    test.beforeEach(async ({ page }) => {
        await page.setViewportSize(DESKTOP_VIEWPORT);
        await waitForNavbar(page);

    });

    test('english persists after refresh', async ({ page }) => {

        const languageButton =
            page.getByTestId('desktop-language-button');

        const languageMenu =
            page.getByTestId('desktop-language-menu');

        const messagesText = () =>
            page.getByTestId('messages-button');

        await openLanguageMenu(
            languageButton,
            languageMenu,
        );

        await languageMenu.getByTestId('en').click();

        await checkLanguagePersistence(
            page,
            async () => {
                await expect(messagesText())
                    .toContainText('Messages');
            },
            async () => {
                await expect(
                    page.getByTestId('login-header')
                ).toContainText(/Login/i);
            },
        );

    });

    test('german persists after refresh', async ({ page }) => {

        const languageButton =
            page.getByTestId('desktop-language-button');

        const languageMenu =
            page.getByTestId('desktop-language-menu');

        const messagesText = () =>
            page.getByTestId('messages-button');

        await openLanguageMenu(
            languageButton,
            languageMenu,
        );

        await languageMenu.getByTestId('de').click();

        await checkLanguagePersistence(
            page,
            async () => {
                await expect(messagesText())
                    .toContainText('Nachrichten');
            },
            async () => {
                await expect(
                    page.getByTestId('login-header')
                ).toContainText(/Anmelden/i);
            },
        );

    });

    test('french persists after refresh', async ({ page }) => {

        const languageButton =
            page.getByTestId('desktop-language-button');

        const languageMenu =
            page.getByTestId('desktop-language-menu');

        const messagesText = () =>
            page.getByTestId('messages-button');

        await openLanguageMenu(
            languageButton,
            languageMenu,
        );

        await languageMenu.getByTestId('fr').click();

        await checkLanguagePersistence(
            page,
            async () => {
                await expect(messagesText())
                    .toContainText('Messages');
            },
            async () => {
                await expect(
                    page.getByTestId('login-header')
                ).toContainText(/Connexion/i);
            },
        );

    });

    test('spanish persists after refresh', async ({ page }) => {

        const languageButton =
            page.getByTestId('desktop-language-button');

        const languageMenu =
            page.getByTestId('desktop-language-menu');

        const messagesText = () =>
            page.getByTestId('messages-button');

        await openLanguageMenu(
            languageButton,
            languageMenu,
        );

        await languageMenu.getByTestId('es').click();

        await checkLanguagePersistence(
            page,
            async () => {
                await expect(messagesText())
                    .toContainText('Mensajes');
            },
            async () => {
                await expect(
                    page.getByTestId('login-header')
                ).toContainText(/Iniciar sesión/i);
            },
        );

    });

    test('italian persists after refresh', async ({ page }) => {

        const languageButton =
            page.getByTestId('desktop-language-button');

        const languageMenu =
            page.getByTestId('desktop-language-menu');

        const messagesText = () =>
            page.getByTestId('messages-button');

        await openLanguageMenu(
            languageButton,
            languageMenu,
        );

        await languageMenu.getByTestId('it').click();

        await checkLanguagePersistence(
            page,
            async () => {
                await expect(messagesText())
                    .toContainText('Messaggi');
            },
            async () => {
                await expect(
                    page.getByTestId('login-header')
                ).toContainText(/Accedi/i);
            },
        );

    });

    test('desktop selected language button persists after refresh', async ({ page }) => {

        const languageButton =
            page.getByTestId('desktop-language-button');

        const languageMenu =
            page.getByTestId('desktop-language-menu');

        await openLanguageMenu(
            languageButton,
            languageMenu,
        );

        await languageMenu.getByTestId('es').click();

        await expect(languageButton)
            .toContainText('Español');

        await page.reload();

        await page.waitForLoadState('networkidle');

        await expect(languageButton)
            .toContainText('Español');

    });

});

test.describe('Language Switching on Mobile', () => {

    test.beforeEach(async ({ page }) => {

        await page.setViewportSize(MOBILE_VIEWPORT);

        await waitForNavbar(page);

    });

    test('mobile english persists after refresh', async ({ page }) => {

        const languageButton =
            page.getByTestId('mobile-language-button');

        const languageMenu =
            page.getByTestId('mobile-language-menu');

        const mobileSearchInput =
            page.getByTestId('mobile-search-input');

        await openLanguageMenu(
            languageButton,
            languageMenu,
        );

        await languageMenu.getByTestId('en').click();

        await checkLanguagePersistence(page, async () => {

            await expect(mobileSearchInput)
                .toHaveAttribute('placeholder', /Search/i);

        }, async () => {
            await expect(
                page.getByTestId('login-header')
            ).toContainText(/Login/i);
        });

    });

    test('mobile german persists after refresh', async ({ page }) => {

        const languageButton =
            page.getByTestId('mobile-language-button');

        const languageMenu =
            page.getByTestId('mobile-language-menu');

        const mobileSearchInput =
            page.getByTestId('mobile-search-input');

        await openLanguageMenu(
            languageButton,
            languageMenu,
        );

        await languageMenu.getByTestId('de').click();

        await checkLanguagePersistence(page, async () => {

            await expect(mobileSearchInput)
                .toHaveAttribute('placeholder', /Suche|Suchen/i);

        }, async () => {
            await expect(
                page.getByTestId('login-header')
            ).toContainText(/Anmelden/i);
        });

    });

    test('mobile french persists after refresh', async ({ page }) => {

        const languageButton =
            page.getByTestId('mobile-language-button');

        const languageMenu =
            page.getByTestId('mobile-language-menu');

        const mobileSearchInput =
            page.getByTestId('mobile-search-input');

        await openLanguageMenu(
            languageButton,
            languageMenu,
        );

        await languageMenu.getByTestId('fr').click();

        await checkLanguagePersistence(page, async () => {

            await expect(mobileSearchInput)
                .toHaveAttribute('placeholder', /Recherche|Chercher/i);

        }, async () => {
            await expect(
                page.getByTestId('login-header')
            ).toContainText(/Connexion/i);
        });

    });

    test('mobile spanish persists after refresh', async ({ page }) => {

        const languageButton =
            page.getByTestId('mobile-language-button');

        const languageMenu =
            page.getByTestId('mobile-language-menu');

        const mobileSearchInput =
            page.getByTestId('mobile-search-input');

        await openLanguageMenu(
            languageButton,
            languageMenu,
        );

        await languageMenu.getByTestId('es').click();

        await checkLanguagePersistence(page, async () => {

            await expect(mobileSearchInput)
                .toHaveAttribute('placeholder', /Buscar/i);

        }, async () => {
            await expect(
                page.getByTestId('login-header')
            ).toContainText(/Iniciar sesión/i);
        });

    });

    test('mobile italian persists after refresh', async ({ page }) => {

        const languageButton =
            page.getByTestId('mobile-language-button');

        const languageMenu =
            page.getByTestId('mobile-language-menu');

        const mobileSearchInput =
            page.getByTestId('mobile-search-input');

        await openLanguageMenu(
            languageButton,
            languageMenu,
        );

        await languageMenu.getByTestId('it').click();

        await checkLanguagePersistence(page, async () => {

            await expect(mobileSearchInput)
                .toHaveAttribute('placeholder', /Cerca/i);

        }, async () => {
            await expect(
                page.getByTestId('login-header')
            ).toContainText(/Accedi/i);
        });

    });

    test('mobile selected language button persists after refresh', async ({ page }) => {

        const languageButton =
            page.getByTestId('mobile-language-button');

        const languageMenu =
            page.getByTestId('mobile-language-menu');

        await openLanguageMenu(
            languageButton,
            languageMenu,
        );

        await languageMenu.getByTestId('es').click();

        await expect(languageButton)
            .toContainText('🇪🇸');

        await page.reload();

        await page.waitForLoadState('networkidle');

        await expect(languageButton)
            .toContainText('🇪🇸');

    });
});


test.describe('Language Switching on Medium', () => {

    test.beforeEach(async ({ page }) => {

        await page.setViewportSize(MEDIUM_VIEWPORT);

        await waitForNavbar(page);

    });

    test('medium selected language button persists after refresh', async ({ page }) => {

        const languageButton =
            page.getByTestId('medium-language-button');

        const languageMenu =
            page.getByTestId('medium-language-menu');

        await openLanguageMenu(
            languageButton,
            languageMenu,
        );

        await languageMenu.getByTestId('es').click();

        await expect(languageButton)
            .toContainText('🇪🇸');

        await page.reload();

        await page.waitForLoadState('networkidle');

        await expect(languageButton)
            .toContainText('🇪🇸');

    });

});