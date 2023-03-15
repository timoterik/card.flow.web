/*
 * Copyright © 2022-2023, DCCTech, Hungary
 */

import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'nb-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss']
})
export class FormInputComponent implements OnInit {
  @Input()
  label: string;

  @Input()
  icon: string;

  @Input()
  inputId: string;

  constructor() {
  }

  ngOnInit() {
  }

}
