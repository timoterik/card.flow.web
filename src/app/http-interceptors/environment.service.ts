/*
 * Copyright © 2022-2023, DCCTech, Hungary
 */

import {Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class EnvironmentInterceptorService implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (!req.url.match(new RegExp(`^${environment.api_url}`))) {
      let url = req.url;
      if (req.url.match(/^\//)) {
        url = environment.api_url + req.url;
      } else {
        url = `${environment.api_url}/${req.url}`;
      }
      return next.handle(req.clone({url: url}));
    }
    return next.handle(req);
  }
}
