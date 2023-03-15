/*
 * Copyright © 2022-2023, DCCTech, Hungary
 */

import {browser, by, element} from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('nb-root h1')).getText();
  }
}
