/*
 * Copyright © 2022-2023, DCCTech, Hungary
 */

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BoardListViewComponent} from './board-list-view.component';
import {MockComponent} from 'mock-component';
import {TemplateComponent} from '../../common/template/template.component';
import {BoardService} from '../board.service';
import {Router} from '@angular/router';
import {AuthService} from '../../common/auth.service';
import {of} from 'rxjs/observable/of';
import {Board} from '../board';
import {BoardCreateComponent} from '../board-create/board-create.component';
import {FormsModule} from '@angular/forms';

describe('BoardListViewComponent', () => {
  let component: BoardListViewComponent;
  let fixture: ComponentFixture<BoardListViewComponent>;
  let board: Board;

  const bs = jasmine.createSpyObj('BoardService', ['getBoardsByUser']);
  const auth = jasmine.createSpyObj('AuthService', ['getCurrentUser']);
  const router = jasmine.createSpyObj('Router', ['navigate']);
  beforeEach(async(() => {
    board = Board.createBoardFromBoardResponse({
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
    });
    bs.getBoardsByUser.and.returnValue(of([]));
    auth.getCurrentUser.and.returnValue(of('userLink'));

    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [
        BoardListViewComponent,
        BoardCreateComponent,
        MockComponent(TemplateComponent)
      ],
      providers: [
        {provide: BoardService, useValue: bs},
        {provide: AuthService, useValue: auth},
        {provide: Router, useValue: router}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate on Selection', function () {
    component.onSelect(board);
    expect(router.navigate.calls.first().args).toEqual([[board.frontEndLink]]);
  });

  it('creationStarted() should change the value of create to true', () => {
    component.create = false;
    component.creationStarted();
    expect(component.create).toBe(true);
  });

  it('endCreation() should change the value of create to false', () => {
    component.create = true;
    component.endCreation();
    expect(component.create).toBe(false);
  });
});
