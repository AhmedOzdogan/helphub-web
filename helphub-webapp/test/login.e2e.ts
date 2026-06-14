import { expect } from '@wdio/globals';
import HomePage from './pageobjects/home.page';
import loginPage from './pageobjects/login.page';

const TEST_USER_EMAIL = process.env.testUsername ?? '';
const TEST_USER_PASSWORD = process.env.testPassword ?? '';

describe('Login', () => {
    beforeEach(async () => {
        await HomePage.navigateHome();
    });

    it('should not login with invalid credentials', async () => {
        await loginPage.open();
        await expect(loginPage.inputUsername).toBeDisplayed();
        await expect(loginPage.inputPassword).toBeDisplayed();
        await expect(loginPage.btnSubmit).toBeDisplayed();
        await loginPage.login('invalid@example.com', 'wrongpassword');

    });

    it('should login with valid credentials', async () => {
        await loginPage.open();
        await expect(loginPage.inputUsername).toBeDisplayed();
        await expect(loginPage.inputPassword).toBeDisplayed();
        await expect(loginPage.btnSubmit).toBeDisplayed();
        await loginPage.login(TEST_USER_EMAIL, TEST_USER_PASSWORD);

    });


});