import { $, driver } from '@wdio/globals';
import Page from './page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class SignupPage extends Page {

    private get isIos() {
        return driver.isIOS;
    }
    /**
     * define selectors using getter methods
     */

    public get inputUsername() {
        return this.isIos
            ? $('~signup-name-input')
            : $('//*[@resource-id="signup-name-input"]');
    }

    public get inputemail() {
        return this.isIos
            ? $('~signup-email-input')
            : $('//*[@resource-id="signup-email-input"]');
    }

    public get inputPassword() {
        return this.isIos
            ? $('~signup-password-input')
            : $('//*[@resource-id="signup-password-input"]');
    }

    public get inputConfirmPassword() {
        return this.isIos
            ? $('~signup-confirm-password-input')
            : $('//*[@resource-id="signup-confirm-password-input"]');
    }

    public get btnSubmit() {
        return this.isIos
            ? $('~signup-button')
            : $('//*[@resource-id="signup-button"]');
    }

    public get accountMenuButton() {
        return $('~Toggle account menu');
    }

    public get mobileSignupButton() {
        return this.isIos
            ? $('~mobileSignUpButton')
            : $('//*[@resource-id="mobileSignUpButton"]');
    }

    public get signupHeader() {
        return this.isIos
            ? $('~signup-header')
            : $('//*[@resource-id="signup-header"]');
    }

    private async fillField(element: ReturnType<typeof $>, value: string) {
        await element.setValue(value);

        if (this.isIos) {
            const returnKey = await $('//XCUIElementTypeButton[@name="Return"]');

            if (await returnKey.isExisting()) {
                await returnKey.click();
            }
        }
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    public async signup(username: string, email: string, password: string) {
        await this.inputUsername.waitForDisplayed({ timeout: 10000 });
        await this.inputemail.waitForDisplayed({ timeout: 10000 });
        await this.inputPassword.waitForDisplayed({ timeout: 10000 });
        await this.inputConfirmPassword.waitForDisplayed({ timeout: 10000 });

        await this.fillField(this.inputUsername, username);
        await this.fillField(this.inputemail, email);
        await this.fillField(this.inputPassword, password);
        await this.fillField(this.inputConfirmPassword, password);

        const fs = await import('fs');

        const sourceBeforeClick = await driver.getPageSource();

        fs.writeFileSync(
            this.isIos
                ? './test/artifacts/signup/ios/before-signup-click.xml'
                : './test/artifacts/signup/android/before-signup-click.xml',
            sourceBeforeClick,
            'utf8'
        );

        if (this.isIos) {
            const returnKey = await $('//XCUIElementTypeButton[@name="Return"]');

            if (await returnKey.isExisting()) {
                await returnKey.click();
            }
        }
        await this.btnSubmit.waitForDisplayed({ timeout: 10000 });

        await this.btnSubmit.click();

        await driver.pause(2000);

        const signupSuccessMessage = await this.isIos
            ? $('~signup-success')
            : $('//*[@resource-id="signup-success"]');

        await signupSuccessMessage.isExisting().catch(() => false);

        const sourceAfterClick = await driver.getPageSource();

        fs.writeFileSync(
            this.isIos
                ? './test/artifacts/signup/ios/after-signup-click.xml'
                : './test/artifacts/signup/android/after-signup-click.xml',
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

        fs.mkdirSync('./test/artifacts/signup/ios', { recursive: true });
        fs.mkdirSync('./test/artifacts/signup/android', { recursive: true });

        fs.writeFileSync(
            this.isIos ?
                './test/artifacts/signup/ios/signup-before-navigation.xml' :
                './test/artifacts/signup/android/signup-before-navigation.xml',
            sourceBefore,
            'utf8'
        );

        if (await this.inputemail.isExisting()) {
            await this.inputemail.waitForDisplayed({ timeout: 10000 });
            return;
        }

        await this.accountMenuButton.waitForDisplayed({ timeout: 10000 });
        await this.accountMenuButton.click();

        await this.mobileSignupButton.waitForDisplayed({ timeout: 10000 });
        await this.mobileSignupButton.click();

        await this.signupHeader.waitForDisplayed({ timeout: 10000 });
        await this.inputUsername.waitForDisplayed({ timeout: 10000 });

        await driver.pause(5000);

        const sourceAfter = await driver.getPageSource();

        fs.writeFileSync(
            this.isIos ?
                './test/artifacts/signup/ios/signup-after-navigation.xml' :
                './test/artifacts/signup/android/signup-after-navigation.xml',
            sourceAfter,
            'utf8'
        );
    }
}

export default new SignupPage();
