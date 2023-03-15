/*
 * Copyright © 2022-2023, DCCTech, Hungary
 */

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BoardViewComponent} from './board-view.component';
import {MockComponent} from 'mock-component';
import {TemplateComponent} from '../../common/template/template.component';
import {BoardMenuComponent} from '../board-menu/board-menu.component';
import {BoardService} from '../board.service';
import {AuthService} from '../../common/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivatedRouteStub} from '../../test-helper/activated-route-stub';
import {By} from '@angular/platform-browser';
import {Board} from '../board';
import {BoardEditNameComponent} from '../board-edit-name/board-edit-name.component';
import {FormsModule} from '@angular/forms';
import {of} from 'rxjs/observable/of';
import {CardlistViewComponent} from '../../cardList/cardlist-view/cardlist-view.component';
import {Subject} from 'rxjs/Subject';
import {CardList} from '../../cardList/CardList';
import {CardListService} from '../../cardList/card-list.service';

describe('BoardViewComponent', () => {
  let component: BoardViewComponent;
  let fixture: ComponentFixture<BoardViewComponent>;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  const authServiceSpies = jasmine.createSpyObj('AuthService', ['login', 'getCurrentUser']);
  const boardServiceSpies = jasmine.createSpyObj('BoardService', ['getBoard']);

  const boardResponse = {
    name: '1. Board',
    memberships: [
      {
        role: 'ADMIN',
        _embedded: {
          user: {
            username: 'bela',
            firstName: 'Béla',
            lastName: 'Kovács',
            _links: {
              self: {
                href: 'userLink'
              },
              user: {
                href: 'userLink',
                templated: true
              },
              image: {
                href: 'imageLink'
              }
            },
            roles: ['ADMIN']
          }
        },
      }
    ],
    _links: {
      self: {
        href: 'boardLink'
      },
      board: {
        href: 'boardLink'
      }
    }
  };

  const cardListSubject = new Subject<CardList[]>();
  const cls = {
    getLists(id: string) {
      return cardListSubject.asObservable();
    }
  };
  const dummyCardLists = [new CardList('list 1'), new CardList('list 2')];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [
        BoardViewComponent,
        MockComponent(BoardMenuComponent),
        MockComponent(BoardEditNameComponent),
        MockComponent(TemplateComponent),
        MockComponent(CardlistViewComponent)
      ],
      providers: [
        {provide: BoardService, useValue: boardServiceSpies},
        {provide: AuthService, useValue: authServiceSpies},
        {provide: ActivatedRoute, useValue: new ActivatedRouteStub({boardId: 'boardId'})},
        {provide: Router, useValue: routerSpy},
        {provide: CardListService, useValue: cls},
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardViewComponent);
    component = fixture.componentInstance;
    boardServiceSpies.getBoard.and.returnValue(of(Board.createBoardFromBoardResponse(boardResponse)));
    fixture.detectChanges();
    routerSpy.navigate.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('backToBoards() should navigate back to boards', () => {
    component.backToBoards();
    expect(routerSpy.navigate.calls.first().args[0]).toEqual(['/boards']);
  });

  it('html should contain the boards name', () => {
    component.board = Board.createBoardFromBoardResponse(boardResponse);
    fixture.detectChanges();
    const boardNameElement: HTMLInputElement = fixture.debugElement.query(By.css('h2.subtitle')).nativeElement;
    expect(boardNameElement.textContent).toEqual('1. Board');
  });

  it('editStarted() should set editName to true', () => {
    component.editStarted();
    expect(component.editName).toEqual(true);
  });

  it('editFinished() should set editName to false', () => {
    component.editFinished(new Board('newName', {self: {href: 'boardLink'}}));
    expect(component.editName).toEqual(false);
  });

  it('editFinished() should set the boards name', () => {
    component.board = Board.createBoardFromBoardResponse(boardResponse);
    component.editFinished(new Board('newName', {self: {href: 'boardLink'}}));
    expect(component.board.name).toEqual('newName');
  });
  it('should contain the correct boardId', function () {
    fixture.detectChanges();
    expect(component.boardId).toEqual('boardId');
  });

  it('should contain the correct lists', () => {
    cardListSubject.next(dummyCardLists);
    fixture.detectChanges();
    expect(component.cardLists).toEqual(dummyCardLists);
  });

  it('refresh should refresh the cardlists', () => {
    cardListSubject.next([]);
    fixture.detectChanges();
    expect(component.cardLists).toEqual([]);
    component.refreshCardLists();
    cardListSubject.next(dummyCardLists);
    expect(component.cardLists).toEqual(dummyCardLists);
  });
});
