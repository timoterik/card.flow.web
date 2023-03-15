/*
 * Copyright © 2022-2023, DCCTech, Hungary
 */

import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ErrorMessage} from '../../common/error-message';
import {RegistrationService} from '../registration.service';
import {Image} from '../../images/image';

@Component({
  selector: 'nb-registration-view',
  templateUrl: './registration-view.component.html',
  styleUrls: ['./registration-view.component.scss']
})
export class RegistrationViewComponent implements OnInit {

  username: string;
  password: string;
  image: string;
  firstName: string;
  lastName: string;
  uploadInProgress = false;

  constructor(private router: Router, private reg: RegistrationService) {
  }

  ngOnInit() {
  }

  onSubmit() {

    this.reg.registration(this.username, this.password, this.image, this.firstName, this.lastName)
      .subscribe((response) => {
        if (response === true) {
          this.router.navigate(['/login']);
        } else {
          console.log((response as ErrorMessage).message);
        }
      });
  }

  onUploadProgress(isUpload: boolean) {
    this.uploadInProgress = isUpload;
  }

  onUpload(image: Image) {
    this.image = image.selfLink;
  }
}
