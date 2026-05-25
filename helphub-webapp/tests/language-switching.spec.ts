import {
    expect,
    Locator,
    Page,
    test,
} from '@playwright/test';
import {
    DESKTOP_VIEWPORT,
    MEDIUM_VIEWPORT,
    MOBILE_VIEWPORT,
} from './constants/viewports';


const desktopLanguages = [
    {
        code: 'en',
        message: 'Messages',
        login: /Login/i,
    },
    {
        code: 'de',
        message: 'Nachrichten',
        login: /Anmelden/i,
    },
    {
        code: 'fr',
        message: 'Messages',
        login: /Connexion/i,
    },
    {
        code: 'es',
        message: 'Mensajes',
        login: /Iniciar sesión/i,
    },
    {
        code: 'it',
        message: 'Messaggi',
        login: /Accedi/i,
    },
];

const mobileLanguages = [
    {
        code: 'en',
        placeholder: /Search/i,
        login: /Login/i,
    },
    {
        code: 'de',
        placeholder: /Suche|Suchen/i,
        login: /Anmelden/i,
    },
    {
        code: 'fr',
        placeholder: /Recherche|Chercher/i,
        login: /Connexion/i,
    },
    {
        code: 'es',
        placeholder: /Buscar/i,
        login: /Iniciar sesión/i,
    },
    {
        code: 'it',
        placeholder: /Cerca/i,
        login: /Accedi/i,
    },
];


async function waitForNavbar(page: Page) {

    await page.goto('/');

    await expect(
        page.getByRole('button', {
            name: 'Open language menu',
        }).first(),
    ).toBeVisible({ timeout: 30000 });
}

async function openLanguageMenu(
    languageButton: Locator,
    languageMenu: Locator,
) {

    await expect(languageButton)
        .toBeVisible({ timeout: 15000 });

    await expect(languageButton)
        .toBeEnabled({ timeout: 15000 });

    for (let attempt = 0; attempt < 3; attempt++) {

        await languageButton.click({ force: true });

        try {

            await expect(languageMenu)
                .toBeVisible({ timeout: 5000 });

            return;

        } catch {

            if (attempt === 2) {
                throw new Error('Language menu failed to open');
            }
        }
    }
}

async function checkLanguagePersistence(
    page: Page,
    assertion: () => Promise<void>,
    loginAssertion: () => Promise<void>,
) {

    await assertion();

    await page.reload();

    await assertion();

    await page.goto('/login');

    await loginAssertion();

    await page.goto('/');

    await assertion();
}

test.describe('Language Switching on Desktop', () => {

    test.beforeEach(async ({ page }) => {
        await page.setViewportSize(DESKTOP_VIEWPORT);
        await waitForNavbar(page);

    });

    desktopLanguages.forEach((language) => {

        test(`${language.code} persists after refresh`, async ({ page }) => {

            const languageButton =
                page.getByTestId('desktop-language-button');

            const languageMenu =
                page.getByTestId('desktop-language-menu');

            const messagesButton =
                page.getByTestId('messages-button');

            await openLanguageMenu(
                languageButton,
                languageMenu,
            );

            await languageMenu
                .getByTestId(language.code)
                .click();

            await expect(messagesButton)
                .toContainText(language.message);

            await checkLanguagePersistence(
                page,
                async () => {
                    await expect(messagesButton)
                        .toContainText(language.message);
                },
                async () => {
                    await expect(
                        page.getByTestId('login-header'),
                    ).toContainText(language.login);
                },
            );

        });

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

        await expect(
            page.getByTestId('desktop-es-language-button'),
        ).toBeVisible();

        await page.reload();

        await page.waitForLoadState('domcontentloaded');

        await expect(
            page.getByTestId('desktop-es-language-button'),
        ).toBeVisible();

    });

});

test.describe('Language Switching on Mobile', () => {

    test.beforeEach(async ({ page }) => {

        await page.setViewportSize(MOBILE_VIEWPORT);

        await waitForNavbar(page);

    });

    mobileLanguages.forEach((language) => {

        test(`mobile ${language.code} persists after refresh`, async ({ page }) => {

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

            await languageMenu
                .getByTestId(language.code)
                .click();

            await expect(mobileSearchInput)
                .toHaveAttribute(
                    'placeholder',
                    language.placeholder,
                );

            await checkLanguagePersistence(
                page,
                async () => {
                    await expect(mobileSearchInput)
                        .toHaveAttribute(
                            'placeholder',
                            language.placeholder,
                        );
                },
                async () => {
                    await expect(
                        page.getByTestId('login-header'),
                    ).toContainText(language.login);
                },
            );

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

        await expect(
            page.getByTestId('mobile-es-language-button'),
        ).toBeVisible();

        await page.reload();

        await page.waitForLoadState('domcontentloaded');

        await expect(
            page.getByTestId('mobile-es-language-button'),
        ).toBeVisible();

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

        await expect(
            page.getByTestId('medium-es-language-button'),
        ).toBeVisible();

        await page.reload();

        await page.waitForLoadState('domcontentloaded');

        await expect(
            page.getByTestId('medium-es-language-button'),
        ).toBeVisible();

    });

});