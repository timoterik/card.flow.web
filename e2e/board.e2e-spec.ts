/*
 * Copyright © 2022-2023, DCCTech, Hungary
 */

import {BoardPage} from './board.po';
import {browser} from 'protractor';
import {LoginPage} from './login.po';
import {BoardListPage} from './board-list.po';

describe('Board view', () => {
  const loginPage = new LoginPage();
  const boardListPage = new BoardListPage();
  const boardPage = new BoardPage();

  beforeAll(async (done) => {
    await loginPage.loginWithCredentials('bela', 'hello');
    boardListPage.expectBrowserShowsThisPage();
    await boardListPage.selectFirstBoard();
    boardPage.expectBrowserShowsThisPage();
    await boardPage.addNewCardListWithName('CardList1');
    await boardPage.addNewCardListWithName('CardList2');
    done();
  });

  afterAll(async () => {
    await boardPage.clickArchiveButtonOfFirstCardList();
    await boardPage.clickArchiveButtonOfFirstCardList();
  });

  it('should Rename board', async function () {
    expect(browser.getCurrentUrl()).toContain('/boards');
    await boardPage.selectBoard();
    expect(browser.getCurrentUrl()).toMatch(/\/boards\/[^\/]*$/);
    const text = await boardPage.boardTitle().getText();
    await boardPage.boardTitle().click();
    await boardPage.setRenameInput('newBoardName');
    await boardPage.clickOnCancelRename();
    expect(boardPage.boardTitle().getText()).toEqual(text);
    await boardPage.boardTitle().click();
    await boardPage.setRenameInput('newBoardName');
    await boardPage.clickOnSubmitRename();
    await boardPage.goBackToBoards();
    expect(browser.getCurrentUrl()).toContain('/boards');
    await boardPage.selectBoard();
    expect(boardPage.boardTitle().getText()).toEqual('newBoardName');
  });


  it('Archiving a cardlist should decrease the cardlist count', async function () {
    const cardListCount = await boardPage.getCardListCount();
    await boardPage.clickArchiveButtonOfFirstCardList();
    const newCardListCount = await boardPage.getCardListCount();
    expect(newCardListCount).toEqual(cardListCount - 1);
  });

  describe('When adding a new cardlist item', () => {
    let cardListCount;
    let newCardListCount;

    beforeEach(async (done) => {
      cardListCount = await boardPage.getCardListCount();
      await boardPage.addNewCardListWithName('cardList 111');
      newCardListCount = await boardPage.getCardListCount();
      done();
    });

    it('cardlist count should be increased', function () {
      expect(newCardListCount).toEqual(cardListCount + 1);
    });

    afterEach(async (done) => {
      await boardPage.clickArchiveButtonOfFirstCardList();
      done();
    });
  });
});
