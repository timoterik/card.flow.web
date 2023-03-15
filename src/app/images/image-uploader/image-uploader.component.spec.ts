/*
 * Copyright © 2022-2023, DCCTech, Hungary
 */

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ImageUploaderComponent} from './image-uploader.component';
import {FileUploaderComponent} from '../../common/form/file-uploader/file-uploader.component';
import {MockComponent} from 'mock-component';
import {ImageService} from '../image.service';
import {of} from 'rxjs/observable/of';
import {Image} from '../image';
import createSpyObj = jasmine.createSpyObj;

describe('ImageUploaderComponent', () => {
  let component: ImageUploaderComponent;
  let fixture: ComponentFixture<ImageUploaderComponent>;
  const imageServiceSpy = createSpyObj('ImageService', ['upload']);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ImageUploaderComponent,
        MockComponent(FileUploaderComponent)
      ],
      providers: [
        {provide: ImageService, useValue: imageServiceSpy}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onFileSelection', () => {
    let file: File;
    let image: Image;
    beforeEach(() => {
      file = new File([''], 'asd', {type: 'image/jpg'});
      image = new Image({
        contentType: 'image/jpg',
        version: '0',
        _links: {
          image: {
            href: 'imageLink'
          }
        }
      });
    });

    it('should set uploadInProgress to true, then set false', function () {
      imageServiceSpy.upload.and.returnValue(of(image));
      const uploadInProgressSpy = spyOn(component.uploadInProgress, 'emit');
      component.onFileSelection(file);
      expect(uploadInProgressSpy.calls.count()).toBe(2);
      expect(uploadInProgressSpy.calls.first().args).toEqual([true]);
      expect(uploadInProgressSpy.calls.mostRecent().args).toEqual([false]);
    });

    it('should set uploadInProgress to true, then set false', function (done) {
      imageServiceSpy.upload.and.returnValue(of(image));
      component.uploadedImage.subscribe((response) => {
        expect(response).toEqual(image);
        done();
      });
      component.onFileSelection(file);
    });
  });
});
