/*
 * Copyright © 2022-2023, DCCTech, Hungary
 */

import {LoginPage} from './login.po';
import {browser} from 'protractor';

describe('Login ', () => {
  let page: LoginPage;
  beforeEach(() => {
    page = new LoginPage();
  });

  it('login button should login then navigate to /boards', function () {
    page.navigateTo();
    page.setValue('username', 'bela');
    page.setValue('password', 'hello');
    page.submitForm();
    expect(browser.getCurrentUrl()).toContain('/boards');
  });

  it('registration button should navigate to /registration', function () {
    page.navigateTo();
    page.clickRegistrationButton();
    expect(browser.getCurrentUrl()).toContain('/registration');
  });
});
