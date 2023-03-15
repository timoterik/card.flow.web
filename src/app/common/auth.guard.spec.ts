/*
 * Copyright © 2022-2023, DCCTech, Hungary
 */

import {inject, TestBed} from '@angular/core/testing';

import {AuthGuard} from './auth.guard';
import {CookieService} from 'ngx-cookie-service';

describe('AuthGuard', () => {
  let getCookieSpy: jasmine.Spy;
  let authGuard: AuthGuard;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard, CookieService]
    });
    authGuard = TestBed.get(AuthGuard);
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));

  describe('canActivate', () => {
    beforeEach(() => {
      authGuard = TestBed.get(AuthGuard);
    });
    it('should get JSESSIONID cookies', () => {
      getCookieSpy = spyOn(TestBed.get(CookieService), 'get').and.returnValue('fake_SessionId');
      authGuard.canActivate(null, null);
      expect(getCookieSpy).toHaveBeenCalledWith('JSESSIONID');
    });

    it('should return true, when cookie exists', () => {
      getCookieSpy = spyOn(TestBed.get(CookieService), 'get').and.returnValue('fake_SessionId');
      const result = authGuard.canActivate(null, null);
      getCookieSpy.and.returnValue('');
      expect(result).toBe(true);
    });

    it('should return false, when cookie NOT exists', () => {
      getCookieSpy = spyOn(TestBed.get(CookieService), 'get').and.returnValue('');
      const result = authGuard.canActivate(null, null);
      getCookieSpy.and.returnValue('');
      expect(result).toBe(false);
    });
  });
});
