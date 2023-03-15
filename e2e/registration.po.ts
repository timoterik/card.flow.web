/*
 * Copyright © 2022-2023, DCCTech, Hungary
 */

import {AppPage} from './app.po';
import {$, browser} from 'protractor';
import * as path from 'path';

export class RegistrationPage extends AppPage {
  navigateTo() {
    return browser.get('/registration');
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
    return $('#signUp').click();
  }

  uploadImage() {
    const imageInput = $('input[type=file]');
    const imagePath = path.resolve(__dirname, './male-circle-512.png');
    return imageInput.sendKeys(imagePath);
  }
}
