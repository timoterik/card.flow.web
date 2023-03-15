/*
 * Copyright © 2022-2023, DCCTech, Hungary
 */

import {browser} from 'protractor';
import {RegistrationPage} from './registration.po';

describe('Registration ', () => {
  let page: RegistrationPage;
  beforeEach(() => {
    page = new RegistrationPage();
  });

  it('should SignUp then navigate to /login', function () {
    page.navigateTo();
    page.setValue('username', 'swarzi' + Date.now());
    page.setValue('password', 'swarzi');
    page.setValue('firstName', 'Arnold');
    page.setValue('lastName', 'Schwarzenegger');
    browser.wait(page.uploadImage(), 3000);
    page.clickSubmitButton();
    expect(browser.getCurrentUrl()).toContain('/login');

  });
});

