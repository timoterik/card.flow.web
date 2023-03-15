/*
 * Copyright © 2022-2023, DCCTech, Hungary
 */

import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ErrorMessage} from '../common/error-message';

export interface RegistrationResponse {
  username: string;
  roles: string[];
  firstName: string;
  lastName: string;
  links: {
    self: {
      href: string;
    },
    user: {
      href: string;
      templated: boolean;
    },
    image: {
      href: string;
    }
  };
}


@Injectable()
export class RegistrationService {

  constructor(private http: HttpClient) {
  }

  registration(username: string, password: string, image: string, firstName: string, lastName: string): Observable<boolean | ErrorMessage> {
    const body = {username, password, image, firstName, lastName};
    return this.http.post<RegistrationResponse>('/users', body)
      .map(() => true)
      .catch((err: HttpErrorResponse) => {
        if (err.status === 409) {
          return Observable.of(
            new ErrorMessage('Username already taken.', 'USERNAME_TAKEN', err.status, err.statusText));
        }
        return Observable.of(
          new ErrorMessage('Something went wrong in the registration process.', 'UNSUCCESSFUL_REGISTRATION', err.status, err.statusText));
      });
  }
}
