/*
 * Copyright © 2022-2023, DCCTech, Hungary
 */

import {LoginPage} from './login.po';
import {BoardListPage} from './board-list.po';
import {BoardPage} from './board.po';

describe('BoardList View', () => {
  let loginPage: LoginPage;
  let boardListPage: BoardListPage;
  let boardPage: BoardPage;

  beforeEach(async () => {
    loginPage = new LoginPage();
    boardListPage = new BoardListPage();
    boardPage = new BoardPage();
    await loginPage.loginWithCredentials('bela', 'hello');
  });

  it('should Create a new Board, then navigate to the new board', async function () {
    await boardListPage.expectBrowserShowsThisPage();
    await boardListPage.getCreatePlaceholder().click();
    expect(boardListPage.getCreateElement().isPresent()).toBeTruthy();
    const initialBoardCount = await boardListPage.getAllBoards().count();
    await boardListPage.cancelBoardCreation();
    expect(boardListPage.getAllBoards().count()).toEqual(initialBoardCount);

    await boardListPage.getCreatePlaceholder().click();
    await boardListPage.sendNewBoardToBcakend();
    expect(boardListPage.getAllBoards().count()).toEqual(initialBoardCount);

    await boardListPage.getCreatePlaceholder().click();
    await boardListPage.setNewBoardName('test board');
    await boardListPage.sendNewBoardToBcakend();

    boardPage.expectBrowserShowsThisPage();
    await boardListPage.navigateTo();
    expect(boardListPage.getAllBoards().count()).toBeGreaterThan(initialBoardCount);
  });
});
