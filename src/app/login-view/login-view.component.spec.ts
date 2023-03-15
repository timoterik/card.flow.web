/*
 * Copyright © 2022-2023, DCCTech, Hungary
 */

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginViewComponent} from './login-view.component';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../common/auth.service';
import {ErrorMessage} from '../common/error-message';
import {of} from 'rxjs/observable/of';
import {Router} from '@angular/router';
import {By} from '@angular/platform-browser';
import {MockComponent} from 'mock-component';
import {FormInputComponent} from '../common/form/form-input/form-input.component';

describe('LoginViewComponent', () => {
  let component: LoginViewComponent;
  let fixture: ComponentFixture<LoginViewComponent>;

  const auth = jasmine.createSpyObj('AuthService', ['login']);
  const router = jasmine.createSpyObj('Router', ['navigate']);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [
        LoginViewComponent,
        MockComponent(FormInputComponent)
      ],
      providers: [
        {provide: AuthService, useValue: auth},
        {provide: Router, useValue: router}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginViewComponent);
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
    let submit: HTMLButtonElement;
    let reg: HTMLButtonElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(LoginViewComponent);
      fixture.detectChanges();
      const de = fixture.debugElement;
      form = de.query(By.css('form')).nativeElement;
      username = de.query(By.css('#username')).nativeElement;
      password = de.query(By.css('#password')).nativeElement;
      submit = de.query(By.css('#login')).nativeElement;
      reg = de.query(By.css('#registration')).nativeElement;
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

    it('should contain a submit button', () => {
      expect(submit).toBeTruthy();
      expect(submit.textContent).toBe('Submit');
    });

    it('should contain a registration button', () => {
      expect(reg).toBeTruthy();
      expect(reg.textContent.trim()).toBe('Registration');
    });

    it('should navigate to /registration on clicking Registration', function () {
      const href = reg.getAttribute('routerLink');
      expect(href).toContain('/registration');
    });

  });


  describe('onSubmit', () => {
    let loginSpy: jasmine.Spy;
    let navigateSpy: jasmine.Spy;
    beforeEach(() => {
      loginSpy = auth.login.and.returnValue(of(true));
      navigateSpy = router.navigate;
    });

    afterEach(() => {
      loginSpy.calls.reset();
      navigateSpy.calls.reset();
    });

    it('should call login with the given username and password', function () {
      component.username = 'user';
      component.password = 'pass';
      component.onSubmit();
      const args = loginSpy.calls.first().args;
      expect(args).toEqual(['user', 'pass']);
    });

    it('should navigate to /boards on successful login', function () {
      component.onSubmit();
      expect(navigateSpy.calls.first().args[0]).toEqual(['/boards']);
    });

    it('should NOT navigate to anywhere on unsuccessful login', function () {
      auth.login.and.returnValue(of(new ErrorMessage('Unsuccessful Login', 'UNSUCCESFUL_LOGIN')));
      component.onSubmit();
      expect(navigateSpy.calls.count()).toBe(0);
    });


  });
})
;
