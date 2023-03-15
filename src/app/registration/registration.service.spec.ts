/*
 * Copyright © 2022-2023, DCCTech, Hungary
 */

import {inject, TestBed} from '@angular/core/testing';

import {RegistrationResponse, RegistrationService} from './registration.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClient} from '@angular/common/http';
import {ErrorMessage} from '../common/error-message';

describe('RegistrationService', () => {
  let http: HttpClient;
  let httpTestingController: HttpTestingController;
  let reg;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RegistrationService]
    });
    http = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    reg = TestBed.get(RegistrationService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', inject([RegistrationService], (service: RegistrationService) => {
    expect(service).toBeTruthy();
  }));

  describe('Registration', () => {
    let url: string;
    const expectedResult: RegistrationResponse = {
      'username': 'swarzi',
      'roles': ['User'],
      'firstName': 'Arnold',
      'lastName': 'Schwarzenegger',
      'links': {
        'self': {
          'href': 'http://ichbin.at',
        },
        'user': {
          'href': 'http://iam.us',
          'templated': true,
        },
        'image': {
          'href': 'http://amstarkest'
        }
      }
    };

    beforeEach(() => {
      reg = TestBed.get(RegistrationService);
      url = '/users';
    });

    it('should send a POST request to users endpoint', function (done) {
      reg.registration('swarzi', 'swarzi', 'http://amstarkest', 'Arnold', 'Schwarzenegger').subscribe(() => done(), fail);
      const req = httpTestingController.expectOne(url);
      expect(req.request.method).toEqual('POST');
      req.flush(expectedResult);
    });

    it('should send json of input form data', function (done) {
      const body = {
        username: 'swarzi', password: 'swarzi', image: 'http://amstarkest',
        firstName: 'Arnold', lastName: 'Schwarzenegger'
      };
      reg.registration('swarzi', 'swarzi', 'http://amstarkest', 'Arnold', 'Schwarzenegger')
        .subscribe(() => done(), fail);
      const req = httpTestingController.expectOne(url);
      expect(req.request.body).toEqual(body);
      req.flush(expectedResult);
    });

    it('should return true on successful ', function (done) {
      reg.registration('swarzi', 'swarzi', 'http://amstarkest', 'Arnold', 'Schwarzenegger').subscribe((response) => {
        expect(response).toEqual(true);
        done();
      }, fail);
      const req = httpTestingController.expectOne(url);
      req.flush(expectedResult);
    });

    it('should return an Error message on Conflict', function (done) {
      const expectedError = new ErrorMessage('Username already taken.', 'USERNAME_TAKEN', 409, 'Conflict');
      reg.registration('swarzi', 'swarzi', 'http://amstarkest', 'Arnold', 'Schwarzenegger').subscribe((response) => {
        expect(response).toEqual(jasmine.any(ErrorMessage));
        expect(response).toEqual(expectedError);
        done();
      }, () => fail('HttpError is not transformed to ErrorMessage'));
      const req = httpTestingController.expectOne(url);
      req.flush(null, {status: expectedError.httpStatus, statusText: expectedError.httpStatusText});
    });

    it('should return an Error message on any other problem than conflict', function (done) {
      const expectedError = new ErrorMessage('Something went wrong in the registration process.',
        'UNSUCCESSFUL_REGISTRATION', 401, 'Bad Request');
      reg.registration('swarzi', 'swarzi', 'http://amstarkest', 'Arnold', 'Schwarzenegger')
        .subscribe((response) => {
          expect(response).toEqual(jasmine.any(ErrorMessage));
          expect(response).toEqual(expectedError);
          done();
        }, () => fail('HttpError is not transformed to ErrorMessage'));
      const req = httpTestingController.expectOne(url);
      req.flush(null, {status: expectedError.httpStatus, statusText: expectedError.httpStatusText});
    });
  });
});

