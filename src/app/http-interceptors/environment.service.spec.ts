/*
 * Copyright © 2022-2023, DCCTech, Hungary
 */

import {TestBed} from '@angular/core/testing';
import {EnvironmentInterceptorService} from './environment.service';
import {HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {environment} from '../../environments/environment';

describe('EnviromentInterceptorService', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{provide: HTTP_INTERCEPTORS, useClass: EnvironmentInterceptorService, multi: true}]
    });
    http = TestBed.get(HttpClient);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should not modify request when includes api_url', function (done) {
    const url = environment.api_url + '/board';
    http.get(url).subscribe(done, fail);
    const request = httpMock.expectOne(req => req.url === url);
    request.flush({});
  });

  it('should change url to contain api_url', function (done) {
    http.get('/board').subscribe(done, fail);
    const request = httpMock.expectOne(req => req.url === environment.api_url + '/board');
    request.flush({});
  });


  it('should change url to contain api_url and slash', function (done) {
    http.get('board').subscribe(done, fail);
    const request = httpMock.expectOne(req => req.url === environment.api_url + '/board');
    request.flush({});
  });
});
