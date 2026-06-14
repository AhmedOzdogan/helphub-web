import { $, driver } from '@wdio/globals';
import Page from './page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {

    private get isIos() {
        return driver.isIOS;
    }
    /**
     * define selectors using getter methods
     */
    public get inputUsername() {
        return this.isIos
            ? $('~login-email-input')
            : $('//*[@resource-id="login-email-input"]');
    }

    public get inputPassword() {
        return this.isIos
            ? $('~login-password-input')
            : $('//*[@resource-id="login-password-input"]');
    }

    public get btnSubmit() {
        return this.isIos
            ? $('~login-button')
            : $('//*[@resource-id="login-button"]');
    }

    public get accountMenuButton() {
        return $('~Toggle account menu');

    }

    public get mobileLoginButton() {
        return this.isIos
            ? $('~mobileLoginButton')
            : $('//*[@resource-id="mobileLoginButton"]');
    }

    public get loginErrorMessage() {
        return this.isIos
            ? $('~login-error')
            : $('//*[@resource-id="login-error"]');
    }

    public get loginSuccessMessage() {
        return this.isIos
            ? $('~login-success')
            : $('//*[@resource-id="login-success"]');
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    public async login(username: string, password: string) {
        await this.inputUsername.waitForDisplayed({ timeout: 10000 });
        await this.inputPassword.waitForDisplayed({ timeout: 10000 });

        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);

        const fs = await import('fs');

        const sourceBeforeClick = await driver.getPageSource();

        fs.writeFileSync(
            this.isIos
                ? './test/artifacts/login/ios/before-login-click.xml'
                : './test/artifacts/login/android/before-login-click.xml',
            sourceBeforeClick,
            'utf8'
        );

        const returnKey = await $('//XCUIElementTypeButton[@name="Return"]');

        if (await returnKey.isExisting()) {
            await returnKey.click();
        }
        await this.btnSubmit.waitForDisplayed({ timeout: 10000 });

        await this.btnSubmit.click();

        await driver.pause(2000);

        await this.loginErrorMessage.isExisting().catch(() => false);
        await this.loginSuccessMessage.isExisting().catch(() => false);

        const sourceAfterClick = await driver.getPageSource();

        fs.writeFileSync(
            this.isIos
                ? './test/artifacts/login/ios/after-login-click.xml'
                : './test/artifacts/login/android/after-login-click.xml',
            sourceAfterClick,
            'utf8'
        );
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    public async open() {
        // Ensure we are on the home page before navigating to login page, as the login button is only visible from there

        const fs = await import('fs');

        const sourceBefore = await driver.getPageSource();

        fs.mkdirSync('./test/artifacts/login', { recursive: true });
        fs.mkdirSync('./test/artifacts/login/ios', { recursive: true });
        fs.mkdirSync('./test/artifacts/login/android', { recursive: true });

        fs.writeFileSync(
            this.isIos ?
                './test/artifacts/login/ios/login-before-navigation.xml' :
                './test/artifacts/login/android/login-before-navigation.xml',
            sourceBefore,
            'utf8'
        );

        const loginInput = $('~login-email-input');

        if (await loginInput.isExisting()) {
            await loginInput.waitForDisplayed({ timeout: 10000 });
            return;
        }

        await driver.pause(2000);

        await this.accountMenuButton.click();
        await this.mobileLoginButton.click();

        await this.inputUsername.waitForDisplayed({ timeout: 10000 });

        await driver.pause(5000);

        const sourceAfter = await driver.getPageSource();

        fs.writeFileSync(
            this.isIos ?
                './test/artifacts/login/ios/login-after-navigation.xml' :
                './test/artifacts/login/android/login-after-navigation.xml',
            sourceAfter,
            'utf8'
        );
    }
}

export default new LoginPage();
