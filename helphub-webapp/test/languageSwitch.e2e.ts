import { expect } from '@wdio/globals'
import fs from 'fs'
import HomePage from './pageobjects/home.page'

describe('HelpHub Mobile Language Switch', () => {
    it('should open the language menu and switch languages', async () => {
        // Pause to allow the app to load and stabilize before interacting with elements
        await driver.pause(2000)

        await HomePage.navigateHome()

        // Check if the platform is iOS or Android to use appropriate selectors and actions
        const isIOS = driver.isIOS
        // Create artifacts directory if it doesn't exist to store page source snapshots
        fs.mkdirSync('./test/artifacts/languageSwitch', { recursive: true })
        fs.mkdirSync('./test/artifacts/languageSwitch/ios', { recursive: true })
        fs.mkdirSync('./test/artifacts/languageSwitch/android', { recursive: true })

        const source = await driver.getPageSource()

        fs.writeFileSync(
            isIOS
                ? './test/artifacts/languageSwitch/ios/ios-before-language-switch.xml'
                : './test/artifacts/languageSwitch/android/android-before-language-switch.xml',
            source,
            'utf8'
        )

        const getLanguageButton = async () => {
            return isIOS
                ? await $('//XCUIElementTypeButton[@name="Open language menu" or @label="Open language menu"]')
                : await $('~Open language menu')
        }

        const languageButton = await getLanguageButton()

        // Assert that the language menu button is displayed on the screen
        await expect(languageButton).toBeDisplayed()

        // Click the language menu button to open the language options
        await languageButton.click()
        await driver.pause(1000)

        const sourceAfterOpen = await driver.getPageSource()
        fs.writeFileSync(
            isIOS
                ? './test/artifacts/languageSwitch/ios/ios-after-language-menu-open.xml'
                : './test/artifacts/languageSwitch/android/android-after-language-menu-open.xml',
            sourceAfterOpen,
            'utf8'
        )
        const languageOptions = [
            {
                code: 'de',
                androidLabel: 'Deutsch',
                searchPlaceholder: 'Suchen...',
            },
            {
                code: 'en',
                androidLabel: 'English',
                searchPlaceholder: 'Search...',
            }
        ]

        for (const language of languageOptions) {
            const option = isIOS
                ? await $(`~${language.code}`)
                : await $(`//*[@resource-id="${language.code}" or @content-desc="${language.code}"]`)

            await expect(option).toBeDisplayed()

            await option.click()

            await driver.waitUntil(async () => {
                const source = await driver.getPageSource()
                return source.includes(language.searchPlaceholder)
            }, {
                timeout: 10000,
                timeoutMsg: `Language ${language.code} was not applied`,
            })

            const updatedSource = await driver.getPageSource()
            expect(updatedSource).toContain(language.searchPlaceholder)

            if (language.code !== languageOptions[languageOptions.length - 1].code) {
                const languageButton = await getLanguageButton()
                await languageButton.click()
                await driver.pause(1000)
            }
        }
    })
})
