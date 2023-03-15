/*
 * Copyright © 2022-2023, DCCTech, Hungary
 */

import {AppPage} from './app.po';
import {$, $$, browser} from 'protractor';

export class BoardListPage extends AppPage {

  navigateTo() {
    return browser.get('/boards');
  }

  selectFirstBoard() {
    return $('.flex-item > .card').click();
  }

  expectBrowserShowsThisPage() {
    expect(browser.getCurrentUrl()).toMatch(/\/boards$/);
  }

  getCreatePlaceholder() {
    return $('.board-create');
  }

  getCreateElement() {
    return $('nb-board-create');
  }

  setNewBoardName(boardName: string) {
    return $('#boardName').sendKeys(boardName);
  }

  sendNewBoardToBcakend() {
    return $('button[type=submit]').click();
  }

  cancelBoardCreation() {
    return $('.cancel').click();
  }

  getAllBoards() {
    return $$('.flex-item:not(.board-create)');
  }
}
