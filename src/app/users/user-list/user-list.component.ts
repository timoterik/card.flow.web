/*
 * Copyright © 2022-2023, DCCTech, Hungary
 */

import {Component, Input, OnInit} from '@angular/core';
import {User} from '../user';

@Component({
  selector: 'nb-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @Input()
  user: User;

  constructor() {
  }

  ngOnInit() {
  }

}
