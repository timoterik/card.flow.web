/*
 * Copyright © 2022-2023, DCCTech, Hungary
 */

import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ImageService} from '../image.service';
import {Image} from '../image';

@Component({
  selector: 'nb-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss']
})
export class ImageUploaderComponent implements OnInit {
  @Output()
  uploadInProgress = new EventEmitter<boolean>();
  @Output()
  uploadedImage = new EventEmitter<Image>();

  constructor(public is: ImageService) {
  }

  ngOnInit() {
  }

  onFileSelection(file: File) {
    this.uploadInProgress.emit(true);
    this.is.upload(file).subscribe((response) => {
      if (response instanceof Image) {
        this.uploadInProgress.emit(false);
        this.uploadedImage.emit(response);
      }
    });
  }
}
