/*
 * Copyright © 2022-2023, DCCTech, Hungary
 */

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/take';

@Component({
  selector: 'nb-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {
  @Input()
  accept: string[];
  @Output()
  file = new EventEmitter<File>();
  @Input()
  uploadInProgress = false;

  constructor() {
  }

  ngOnInit() {
  }

  fileHandler(files: FileList) {
    if (files.length > 0) {
      this.file.emit(files.item(0));
      this.uploadInProgress = true;
    }
  }
}
