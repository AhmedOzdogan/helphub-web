import { $, driver } from '@wdio/globals';
import Page from './page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class HomePage extends Page {
    /**
     * we navigate to home page before each test
     */

    public get isIos() {
        return driver.isIOS;
    }

    public get homePageSlider() {
        return this.isIos
            ? $('//XCUIElementTypeOther[@name="home-page-slider"]')
            : $('~home-page-slider');
    }

    public get homePageButton() {
        return this.isIos
            ? $('//XCUIElementTypeLink[@name="HelpHub"] | //XCUIElementTypeStaticText[@name="helphub-logo-text-mobile"]')
            : $('//*[@resource-id="helphub-logo-text-mobile"] | //*[@content-desc="HelpHub"]');
    }

    public get notNowButton() {
        return $('//XCUIElementTypeButton[@name="Not Now"]');
    }

    public async navigateHome() {

        const isHomePageVisible = await this.homePageSlider.isDisplayed().catch(() => false);

        if (isHomePageVisible) {
            return;
        }

        await this.homePageButton.waitForDisplayed({ timeout: 5000 });
        await this.homePageButton.click();
        await this.homePageSlider.isExisting()
    }
}

export default new HomePage();