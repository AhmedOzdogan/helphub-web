import { expect } from '@wdio/globals'
import fs from 'fs'

describe('HelpHub Mobile Navbar', () => {
    it('should display navbar elements and open/close the mobile menu', async () => {

        // Pause to allow the app to load and stabilize before interacting with elements
        await driver.pause(5000)

        // Check if the platform is iOS or Android to use appropriate selectors and actions
        const isIOS = driver.isIOS

        // Create artifacts directory if it doesn't exist to store page source snapshots
        fs.mkdirSync('./test/artifacts', { recursive: true })

        // Capture the page source before interacting with the menu for debugging purposes
        const source = await driver.getPageSource()
        fs.writeFileSync(
            isIOS
                ? './test/ios/artifacts/ios-before-menu-open.xml'
                : './test/android/artifacts/android-before-menu-open.xml',
            source,
            'utf8'
        )

        const hamburgerButton = isIOS
            ? await $('//XCUIElementTypeButton[@name="Open mobile menu" or @label="Open mobile menu"]')
            : await $('~Open mobile menu')
        // Assert that the hamburger button is displayed on the screen
        await expect(hamburgerButton).toBeDisplayed()

        const logo = isIOS
            ? await $('//XCUIElementTypeStaticText[@name="HelpHub" or @label="HelpHub"]')
            : await $('~HelpHub')

        // Assert that the logo is displayed on the screen
        await expect(logo).toBeDisplayed()

        const accountMenu = isIOS
            ? await $('//XCUIElementTypeButton[@name="Toggle account menu" or @label="Toggle account menu"]')
            : await $('~Toggle account menu')

        // Assert that the account menu button is displayed on the screen
        await expect(accountMenu).toBeDisplayed()

        const languageButton = isIOS
            ? await $('//XCUIElementTypeButton[@name="Open language menu" or @label="Open language menu"]')
            : await $('~Open language menu')
        // Assert that the language menu button is displayed on the screen
        await expect(languageButton).toBeDisplayed()

        const openMenuButton = hamburgerButton
        // Click the hamburger button to open the mobile menu
        await openMenuButton.click()
        await driver.pause(1000)

        // Capture the page source after opening the menu for debugging purposes
        const afterOpenSource = await driver.getPageSource()
        fs.writeFileSync(
            isIOS
                ? './test/ios/artifacts/ios-after-menu-open.xml'
                : './test/android/artifacts/android-after-menu-open.xml',
            afterOpenSource,
            'utf8'
        )

        const mainMenu = isIOS
            ? await $('//*[@name="Main Menu" or @label="Main Menu"]')
            : await $('//*[@text="Main Menu"]')
        // Assert that the main menu is displayed after clicking the hamburger button
        await expect(mainMenu).toBeDisplayed()

        const forMyselfToggle = isIOS
            ? await $('//*[@name="mobile-section-forMyself" or @label="mobile-section-forMyself"]')
            : await $('//*[@text="FOR MYSELF"]')
        // Assert that the "FOR MYSELF" toggle is displayed in the mobile menu
        await expect(forMyselfToggle).toBeDisplayed()

        await forMyselfToggle.click()

        const psychologyItem = isIOS
            ? await $('//*[@name="Psychology" or @label="Psychology"]')
            : await $('//*[@text="Psychology"]')
        // Assert that the "Psychology" item is displayed after clicking the "FOR MYSELF" toggle
        await expect(psychologyItem).toBeDisplayed()

        const closeMenuButton = isIOS
            ? await $('//XCUIElementTypeButton[@name="Close mobile menu" or @label="Close mobile menu"]')
            : await $('~Close mobile menu')
        // Assert that the close menu button is displayed in the mobile menu
        await closeMenuButton.click()
    })
})