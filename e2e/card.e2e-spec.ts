/*
 * Copyright © 2022-2023, DCCTech, Hungary
 */

// import {CardPage} from './card.po';
// import {$, browser, by, element} from 'protractor';
// import {LoginPage} from './login.po';
//
// describe('Card actions on a CardList ', () => {
//   let page: CardPage;
//   let loginPage: LoginPage;
//   beforeEach(() => {
//     page = new CardPage();
//     loginPage = new LoginPage();
//   });
//
//   it('should navigate to /cards', function () {
//     browser.wait(loginPage.login('bela', 'hello'));
//     const cardListUrl = 'http:%2F%2Flocalhost:8080%2FcardLists%2F5ab20f636cb9ff16f0298f58';
//     page.navigateTo(cardListUrl);
//     expect(browser.getCurrentUrl()).toEqual(cardListUrl);
//     console.log('before click h1');
//     page.clickH1();
//     console.log('after click h1');
//
//     page.setAreaValue('admin');
//     console.log('before click cancel');
//
//     page.clickCancelButton();
//     console.log('after click cancel');
//
//     page.clickH1();
//     page.setAreaValue('admin');
//     browser.pause();
//     console.log('before click create');
//
//     page.clickCreateButton();
//     console.log('after click create');
//     expect($('.card-archive').isPresent()).toBeTruthy();
//     console.log('before click archive');
//
//     page.clickArchiveButton();
//     console.log('after click archive');
//
//     expect(browser.getCurrentUrl()).toContain(`/cards/${encodeURI(cardListUrl)}`);
//   });
// });
