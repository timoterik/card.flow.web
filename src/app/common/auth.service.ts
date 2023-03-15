/*
 * Copyright © 2022-2023, DCCTech, Hungary
 */

import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ErrorMessage} from './error-message';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {ILink} from './i-link';

interface LoginResponse {
  sessionId: string;
  _links: {
    user: ILink;
  };
}

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): Observable<boolean | ErrorMessage> {
    const body = new HttpParams().set('username', username).set('password', password);
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post<LoginResponse>('/login', body.toString(), {headers})
      .map((response) => {
        localStorage.setItem('userLink', response._links.user.href);
        return true;
      })
      .catch((err: HttpErrorResponse) => Observable.of(
        new ErrorMessage('Unsuccessful login', 'UNSUCCESSFUL_LOGIN', err.status, err.statusText))
      );
  }

  getCurrentUser(): Observable<string> {
    const user = localStorage.getItem('userLink');
    return Observable.of(user);
  }

}
