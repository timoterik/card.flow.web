/*
 * Copyright © 2022-2023, DCCTech, Hungary
 */

import {TestBed} from '@angular/core/testing';

import {AuthInterceptorService} from './auth.service';
import {HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('AuthInterceptorService', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}]
    });
    http = TestBed.get(HttpClient);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should change withCredentials to true', function (done) {
    http.get('/board').subscribe(done, fail);
    const request = httpMock.expectOne(req => req.withCredentials === true);
    request.flush({sessionId: 'fakeSessionId'});
  });
});
