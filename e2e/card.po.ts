/*
 * Copyright © 2022-2023, DCCTech, Hungary
 */

import {$, browser} from 'protractor';

export class CardPage {
  navigateTo(cardListURL) {
    return browser.get(`/cards/${cardListURL}`);
  }

  getAreaInput(id: string) {
    // return element(by.css(`#${id}`));
    return $(`textarea`);
  }

  clickH1() {
    return $('h1').click();
  }

  setAreaValue(data: string) {
    return $(`textarea`).sendKeys(data);
  }

  submitForm() {
    return $('form').submit();
  }

  clickCreateButton() {
    return $('#create').click();
  }

  clickArchiveButton() {
    return $('.card-archive').click();
  }

  clickCancelButton() {
    return $('#cancel').click();
  }
}
