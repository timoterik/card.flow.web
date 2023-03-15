/*
 * Copyright © 2022-2023, DCCTech, Hungary
 */

import {AppPage} from './app.po';
import {$, browser} from 'protractor';

export class LoginPage extends AppPage {
  navigateTo() {
    return browser.get('/login');
  }

  loginWithCredentials(username: string, password: string) {
    this.navigateTo();
    this.setValue('username', username);
    this.setValue('password', password);
    return this.submitForm();
  }

  getInput(id: string) {
    // return element(by.css(`#${id}`));
    return $(`#${id}`);
  }

  setValue(input: string, data: string) {
    return this.getInput(input).sendKeys(data);
  }

  submitForm() {
    return $('form').submit();
  }

  clickSubmitButton() {
    return $('#login').click();
  }

  clickRegistrationButton() {
    return $('#registration').click();
  }

  expectBrowserShowsThisPage() {
    expect(browser.getCurrentUrl()).toMatch(/\/login$/);
  }
}
