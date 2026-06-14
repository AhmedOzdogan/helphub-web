import { expect } from '@wdio/globals';
import HomePage from './pageobjects/home.page';
import signup from './pageobjects/signup.page';

// create test user credentials for signup test
const TEST_USER_NAME = `testuser${Date.now()}`;
const TEST_USER_EMAIL = `testuser${Date.now()}@example.com`;
const TEST_USER_PASSWORD = 'TestPassword123!';

describe('signup', () => {

    it('should not login with invalid credentials', async () => {
        await HomePage.navigateHome();
        await signup.open();
        await expect(signup.inputUsername).toBeDisplayed();
        await expect(signup.inputemail).toBeDisplayed();
        await expect(signup.inputPassword).toBeDisplayed();
        await expect(signup.inputConfirmPassword).toBeDisplayed();
        await expect(signup.btnSubmit).toBeDisplayed();
        await signup.signup(TEST_USER_NAME, TEST_USER_EMAIL, TEST_USER_PASSWORD);

    });



});