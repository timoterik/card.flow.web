/*
 * Copyright © 2022-2023, DCCTech, Hungary
 */

import {AppPage} from './app.po';
import {LoginPage} from './login.po';

describe('cardFlow-frontend App', () => {
  const appPage = new AppPage();
  const loginPage = new LoginPage();

  it('Should display the login page', () => {
    appPage.navigateTo();
    loginPage.expectBrowserShowsThisPage();
  });
});
