/*
 * Copyright © 2022-2023, DCCTech, Hungary
 */

import {inject, TestBed} from '@angular/core/testing';

import {AuthService} from './auth.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ErrorMessage} from './error-message';

describe('AuthService', () => {
  let http: HttpClient;
  let httpTestingController: HttpTestingController;
  let auth;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    http = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    auth = TestBed.get(AuthService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be cancelled', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  describe('Login', () => {
    let url: string;
    const expectedResult = {
      'sessionId': 'fake_sessionId',
      _links: {
        user: {
          href: 'userLink'
        }
      }
    };

    beforeEach(() => {
      auth = TestBed.get(AuthService);
      url = '/login';
    });

    afterEach(() => {
      localStorage.clear();
    });

    it('should send a POST request to login endpoint', function (done) {
      auth.login('admin', 'admin').subscribe(() => done(), fail);
      const req = httpTestingController.expectOne(url);
      expect(req.request.method).toEqual('POST');
      req.flush(expectedResult);
    });
    it('should send username and password', function (done) {
      const body = new HttpParams().set('username', 'admin').set('password', 'admin');
      auth.login('admin', 'admin').subscribe(() => done(), fail);
      const req = httpTestingController.expectOne(url);
      expect(req.request.body).toEqual(body.toString());
      req.flush(expectedResult);
    });
    it('should return true on successful ', function (done) {
      auth.login('admin', 'admin').subscribe((response) => {
        expect(response).toEqual(true);
        done();
      }, fail);
      const req = httpTestingController.expectOne(url);
      req.flush(expectedResult);
    });

    it('should save the userLink to the localStorage', function (done) {
      auth.login('admin', 'admin').subscribe((response) => {
        const user = localStorage.getItem('userLink');
        expect(user).toEqual(expectedResult._links.user.href);
        done();
      }, fail);
      const req = httpTestingController.expectOne(url);
      req.flush(expectedResult);
    });

    it('should return an Error message on unsuccesfull login', function (done) {
      const expectedError = new ErrorMessage('Unsuccessful login', 'UNSUCCESSFUL_LOGIN', 401, 'Unauthorized');
      auth.login('admin', 'admin').subscribe((response) => {
        expect(response).toEqual(jasmine.any(ErrorMessage));
        expect(response).toEqual(expectedError);
        done();
      }, () => fail('HttpError is not transformed to ErrorMessage'));
      const req = httpTestingController.expectOne(url);
      req.flush(null, {status: expectedError.httpStatus, statusText: expectedError.httpStatusText});
    });

    describe('getCurrentUser', () => {
      it('should return an Observable', function (done) {
        localStorage.setItem('userLink', 'userLink');
        auth.getCurrentUser().subscribe(done, fail);
        localStorage.clear();
      });

      it('should return the storedUserLink', function (done) {
        const er = 'http://userLink';
        localStorage.setItem('userLink', er);
        auth.getCurrentUser().subscribe(userlink => {
          expect(userlink).toEqual(er);
          done();
        }, fail);
        localStorage.clear();
      });

      it('should return null if no User stored', function (done) {
        localStorage.clear();
        auth.getCurrentUser().subscribe(userlink => {
          expect(userlink).toBe(null);
          done();
        }, fail);
      });
    });
  });
});
