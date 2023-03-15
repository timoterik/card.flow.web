/*
 * Copyright © 2022-2023, DCCTech, Hungary
 */

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FileUploaderComponent} from './file-uploader.component';
import {Component} from '@angular/core';


@Component({
  selector: 'nb-testing',
  template: `
    <nb-file-uploader [accept]="['images/jpeg', 'images/jpg']"></nb-file-uploader>`
})
class FileUploadTestingComponent {
}

class FileListClass {
  constructor(private files: File[]) {
  }

  get length() {
    return this.files.length;
  }

  item(index) {
    return this.files[index];
  }

  [index: number]: File;
}

describe('FileUploaderComponent', () => {
  let component: FileUploaderComponent;
  let fixture: ComponentFixture<FileUploaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FileUploaderComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return a file', function (done) {
    const fl = new FileListClass([new File([''], 'file.test')]);
    component.file.subscribe((file: File) => {
      expect(file).toEqual(jasmine.any(File));
      expect(file.name).toEqual(fl.item(0).name);
      done();
    }, fail);
    component.fileHandler(fl);
  });
  it('should change uploadInProggress to true, on file upload', function () {
    const fl = new FileListClass([new File([''], 'file.test')]);
    component.fileHandler(fl);
    expect(component.uploadInProgress).toBe(true);
  });


  it('should not return a file when FileList is empty', function () {
    const fl = new FileListClass([]);
    component.file.subscribe(fail);
    component.fileHandler(fl);
  });
  it('should not change uploadInProggress to true, on file upload  when FileList is empty', function () {
    const fl = new FileListClass([]);
    component.fileHandler(fl);
    expect(component.uploadInProgress).toBe(false);
  });
});
