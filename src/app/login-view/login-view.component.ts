/*
 * Copyright © 2022-2023, DCCTech, Hungary
 */

import {Component, OnInit} from '@angular/core';
import fontawesome from '@fortawesome/fontawesome';
import {faKey, faUser} from '@fortawesome/fontawesome-free-solid';
import {AuthService} from '../common/auth.service';
import {ErrorMessage} from '../common/error-message';
import {Router} from '@angular/router';

fontawesome.library.add(faUser, faKey);

@Component({
  selector: 'nb-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})

export class LoginViewComponent implements OnInit {
  username: string;
  password: string;

  constructor(private auth: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.auth.login(this.username, this.password).subscribe((response) => {
      if (response === true) {
        this.router.navigate(['/boards']);
      } else {
        // TODO show visible notification of unsuccessful login
        console.log((response as ErrorMessage).message);
      }
    });
  }

}
