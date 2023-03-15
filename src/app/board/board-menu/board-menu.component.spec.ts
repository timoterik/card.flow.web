/*
 * Copyright © 2022-2023, DCCTech, Hungary
 */

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BoardMenuComponent} from './board-menu.component';
import {UserListComponent} from '../../users/user-list/user-list.component';
import {BoardService} from '../board.service';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {AuthService} from '../../common/auth.service';

describe('BoardMenuComponent', () => {
  let component: BoardMenuComponent;
  let fixture: ComponentFixture<BoardMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [BoardService, HttpClient, HttpHandler, AuthService],
      declarations: [BoardMenuComponent, UserListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('displayMenu() should set menuHidden to false', () => {
    component.menuHidden = true;
    component.displayMenu();
    expect(component.menuHidden).toBe(false);
  });

  it('hideMenu() should set menuHidden to true', () => {
    component.menuHidden = false;
    component.hideMenu();
    expect(component.menuHidden).toBe(true);
  });

  it('showMembers() should set membersView to true', () => {
    component.membersView = false;
    component.showMembers();
    expect(component.membersView).toBe(true);
  });

  it('hideMembers() should set membersView to false', () => {
    component.membersView = true;
    component.hideMembers();
    expect(component.membersView).toBe(false);
  });
});
