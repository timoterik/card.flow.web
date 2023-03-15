/*
 * Copyright © 2022-2023, DCCTech, Hungary
 */

import {AppPage} from './app.po';
import {$, $$, browser} from 'protractor';

export class BoardPage extends AppPage {

  navigateTo(boardId?: string) {
    if (boardId) {
      return browser.get('/boards/' + boardId);
    } else {
      return browser.get('/boards');
    }
  }

  expectBrowserShowsThisPage() {
    expect(browser.getCurrentUrl()).toMatch(/\/boards\/\w+$/);
  }

  setNewCardListName(name: string) {
    return this.getElementById('name').sendKeys(name);
  }

  async addNewCardListWithName(name: string) {
    await this.setNewCardListName(name);
    return this.submitCreateNewCardList();
  }

  getElementById(id: string) {
    return $(`#${id}`);
  }

  getInputTextValue(name: string) {
    return this.getElementById(name).getText();
  }

  submitCreateNewCardList() {
    return $('#new-card-list-form').submit();
  }

  clickSaveNewCardButton() {
    return $('#new-card-list-submit').click();
  }

  clickCancelNewCardButton() {
    return $('#new-card-list-cancel').click();
  }

  getCardListCount() {
    return $$('nb-cardlist-view .column.bg').count();
  }

  clickArchiveButtonOfFirstCardList() {
    return $('nb-cardlist-view .arch').click();
  }

  selectBoard() {
    return $('.card').click();
  }

  boardTitle() {
    return $('h2.subtitle');
  }

  async setRenameInput(newBoardName: string) {
    await $('#rename').clear();
    return $('#rename').sendKeys(newBoardName);
  }

  clickOnSubmitRename() {
    return $('.is-primary').click();
  }

  clickOnCancelRename() {
    return $('.cancel').click();
  }

  goBackToBoards() {
    return browser.get('/boards');
  }
}
