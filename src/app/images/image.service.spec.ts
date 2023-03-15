/*
 * Copyright © 2022-2023, DCCTech, Hungary
 */

import {inject, TestBed} from '@angular/core/testing';

import {ImageService} from './image.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Image, ImageResponse} from './image';
import {ErrorMessage} from '../common/error-message';

describe('ImageService', () => {
  let is: ImageService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ImageService]
    });
    is = TestBed.get(ImageService);
    httpTestingController = TestBed.get(HttpTestingController);
  });
  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', inject([ImageService], (service: ImageService) => {
    expect(service).toBeTruthy();
  }));

  describe('upload', () => {
    it('should send a Post request to /images', function (done) {
      is.upload(new File(['asdas'], 'filename.png', {type: 'image/png'})).subscribe(done, fail);
      const req = httpTestingController.expectOne('/images');
      expect(req.request.method).toEqual('POST');
      req.flush(null);
    });

    it('should send the file as content in FormData', function (done) {
      const file = new File(['asdas'], 'filename.png', {type: 'image/png'});
      is.upload(file).subscribe(done, fail);
      const req = httpTestingController.expectOne('/images');
      expect(req.request.body).toEqual(jasmine.any(FormData));
      expect(req.request.body.get('content')).toEqual(jasmine.any(File));
      expect(req.request.body.get('content')).toEqual(file);
      req.flush(null);
    });

    it('should return an Image object on successful file upload', function (done) {
      const imageResponse: ImageResponse = {
          contentType: 'image/png',
          version: '0',
          _links: {
            image: {
              href: 'imageLink'
            }
          }
        }
      ;
      const file = new File(['asdas'], 'filename.png', {type: 'image/png'});
      is.upload(file).subscribe((response: Image) => {
        expect(response).toEqual(jasmine.any(Image));
        expect(response.contentType).toEqual(imageResponse.contentType);
        expect(response.version).toEqual(imageResponse.version);
        expect(response.selfLink).toEqual(imageResponse._links.image.href);
        done();
      }, fail);
      httpTestingController.expectOne('/images').flush(imageResponse);
    });

    it('should return an ErrorMessage on unsuccessful response', function (done) {
      const file = new File(['asdas'], 'filename.png', {type: 'image/png'});
      is.upload(file).subscribe((response: ErrorMessage) => {
        expect(response).toEqual(jasmine.any(ErrorMessage));
        done();
      }, fail);
      httpTestingController.expectOne('/images').flush({
        'timestamp': 1521319726795,
        'status': 500,
        'error': 'Internal Server Error',
        'message': 'src cannot be null',
        'path': '/images'
      }, {status: 500, statusText: 'Internal Server Error'});
    });
  });
});
