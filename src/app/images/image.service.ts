/*
 * Copyright © 2022-2023, DCCTech, Hungary
 */

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Image, ImageResponse} from './image';
import {ErrorMessage} from '../common/error-message';

@Injectable()
export class ImageService {

  constructor(private http: HttpClient) {
  }

  upload(file: File): Observable<Image | ErrorMessage> {
    const data = new FormData();
    data.append('content', file, file.name);
    return this.http.post<ImageResponse>('/images', data)
      .map((response) => new Image(response))
      .catch((err) => of(
          new ErrorMessage('An error occurred while uploading the image', 'IMAGE_UPLOAD_ERROR', err.status, err.statusText)
        )
      );
  }

}
