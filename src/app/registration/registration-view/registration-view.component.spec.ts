/*
 * Copyright © 2022-2023, DCCTech, Hungary
 */

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RegistrationViewComponent} from './registration-view.component';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {By} from '@angular/platform-browser';
import {MockComponent} from 'mock-component';
import {FormInputComponent} from '../../common/form/form-input/form-input.component';
import {RegistrationService} from '../registration.service';
import {ImageUploaderComponent} from '../../images/image-uploader/image-uploader.component';
import {Image} from '../../images/image';
import {of} from 'rxjs/observable/of';
import {ErrorMessage} from '../../common/error-message';

describe('RegistrationViewComponent', () => {
  let component: RegistrationViewComponent;
  let fixture: ComponentFixture<RegistrationViewComponent>;

  const router = jasmine.createSpyObj('Router', ['navigate']);
  const reg = jasmine.createSpyObj('RegistrationService', ['registration']);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [
        RegistrationViewComponent,
        MockComponent(FormInputComponent),
        MockComponent(ImageUploaderComponent)
      ],
      providers: [
        {provide: Router, useValue: router},
        {provide: RegistrationService, useValue: reg}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Form Inputs', () => {
    let form: HTMLFormElement;
    let username: HTMLInputElement;
    let password: HTMLInputElement;
    let firstName: HTMLInputElement;
    let lastName: HTMLInputElement;
    let signUp: HTMLButtonElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(RegistrationViewComponent);
      fixture.detectChanges();
      const de = fixture.debugElement;
      form = de.query(By.css('form')).nativeElement;
      username = de.query(By.css('#username')).nativeElement;
      password = de.query(By.css('#password')).nativeElement;
      signUp = de.query(By.css('#signUp')).nativeElement;
      lastName = de.query(By.css('#lastName')).nativeElement;
      firstName = de.query(By.css('#firstName')).nativeElement;
    });
    it('should contain a form element', function () {
      expect(form).toBeTruthy();
    });
    it('should contain a username input element', () => {
      expect(username).toBeTruthy();
      expect(username.name).toBe('username');
      expect(username.type).toBe('text');
    });

    it('should contain a password input element', () => {
      expect(password).toBeTruthy();
      expect(password.name).toBe('password');
      expect(password.type).toBe('password');
    });
    it('should contain a firstName input element', () => {
      expect(firstName).toBeTruthy();
      expect(firstName.name).toBe('firstName');
      expect(firstName.type).toBe('text');
    });

    it('should contain a lastName input element', () => {
      expect(lastName).toBeTruthy();
      expect(lastName.name).toBe('lastName');
      expect(lastName.type).toBe('text');
    });

    it('should contain a signUp button', () => {
      expect(signUp).toBeTruthy();
      expect(signUp.textContent).toBe('Sign Up');
    });
  });

  it('should change uploadInProgress on upload event', function () {
    component.uploadInProgress = false;
    component.onUploadProgress(true);
    expect(component.uploadInProgress).toBe(true);
  });

  it('should set Image url on upload finished', function () {
    const image = new Image({
      contentType: 'image/jpg',
      version: '0',
      _links: {
        image: {
          href: 'imageLink'
        }
      }
    });
    component.onUpload(image);
    expect(component.image).toEqual(image.selfLink);
  });
  describe('onSubmit', () => {
    let regSpy: jasmine.Spy;
    let navigateSpy: jasmine.Spy;
    beforeEach(() => {
      regSpy = reg.registration.and.returnValue(of(true));
      navigateSpy = router.navigate;
    });

    afterEach(() => {
      regSpy.calls.reset();
      navigateSpy.calls.reset();
    });

    it('should call registration with the given username, password, image, firstname, lastname', function () {
      component.username = 'user';
      component.password = 'pass';
      component.image = 'image';
      component.firstName = 'First';
      component.lastName = 'Last';
      component.onSubmit();
      const args = regSpy.calls.first().args;
      expect(args).toEqual(['user', 'pass', 'image', 'First', 'Last']);
    });

    it('should navigate to /login on successful login', function () {
      component.onSubmit();
      expect(navigateSpy.calls.first().args[0]).toEqual(['/login']);
    });

    // TODO test fails, why?
    it('should NOT navigate to anywhere on unsuccessful registration', function () {
      reg.registration.and.returnValue(of(new ErrorMessage('Username already taken.', 'USERNAME_TAKEN')));
      component.onSubmit();
      expect(navigateSpy.calls.count()).toBe(0);
    });
  });
});
