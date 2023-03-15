/*
 * Copyright © 2022-2023, DCCTech, Hungary
 */

import {inject, TestBed} from '@angular/core/testing';

import {BoardService} from './board.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClient} from '@angular/common/http';
import {BoardListResponse} from './board-list-response';
import {Board} from './board';
import {AuthService} from '../common/auth.service';
import {of} from 'rxjs/observable/of';

describe('BoardService', () => {
  let http: HttpClient;
  let httpTestingController: HttpTestingController;
  let boardService: BoardService;
  const authServiceSpy = jasmine.createSpyObj('AuthService', ['getCurrentUser']);

  beforeEach(() => {
    authServiceSpy.getCurrentUser.and.returnValue(of('userLink'));
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        BoardService,
        {provide: AuthService, useValue: authServiceSpy}
      ]
    });
    http = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    boardService = TestBed.get(BoardService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', inject([BoardService], (service: BoardService) => {
    expect(service).toBeTruthy();
  }));

  describe('getBoardsByUser', () => {
    const url = `/boards/search/findByMembershipsUserAndArchivedIsFalse`;
    let userLink: string;
    let response: BoardListResponse;

    beforeEach(() => {
      userLink = 'userLink';
      response = {
        _embedded: {
          boards: [{
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
          }]
        }
      };
    });

    it('should send a GET Request', function (done) {
      boardService.getBoardsByUser(userLink).subscribe(done, fail);
      const req = httpTestingController.expectOne(request => request.url.includes(url));
      expect(req.request.method).toEqual('GET');
      req.flush(response);
    });

    it('should send the userlink', function (done) {
      boardService.getBoardsByUser(userLink).subscribe(done, fail);
      const req = httpTestingController.expectOne(request => request.url === `${url}?user=${userLink}`);
      expect(req).toBeTruthy();
      req.flush(response);
    });

    it('should return array of boards on successful request', function (done) {
      boardService.getBoardsByUser(userLink).subscribe((boards) => {
        expect(boards).toEqual(jasmine.any(Array));
        boards.forEach((board, idx) => {
          expect(board).toEqual(jasmine.any(Board));
          expect(board.name).toEqual(response._embedded.boards[idx].name);
          expect(board.selfLink).toEqual(response._embedded.boards[idx]._links.self.href);
        });
        done();
      }, fail);
      const req = httpTestingController.expectOne(request => request.url === `${url}?user=${userLink}`);
      req.flush(response);
    });

    it('should return an empty array on unsuccessful request', function (done) {
      boardService.getBoardsByUser(userLink).subscribe((boards) => {
        expect(boards).toEqual([]);
        done();
      }, fail);
      const req = httpTestingController.expectOne(request => request.url === `${url}?user=${userLink}`);
      req.flush(null, {status: 404, statusText: 'Not Found'});
    });
  });

  describe('createBoard', () => {

    const url = '/boards';

    const boardResponse = {
      name: 'boardName'
      , _links: {self: {href: 'boardLink'}, board: {href: 'boardLink'}}
      , memberships: []
    };

    it('should send a POST request', function (done) {
      boardService.createBoard('boardName').subscribe(done, fail);
      const req = httpTestingController.expectOne(request => request.url.includes(url));
      expect(req.request.method).toEqual('POST');
      req.flush(boardResponse);
    });

    it('should return the created board', function (done) {
      boardService.createBoard('boardName').subscribe((board) => {
        expect(board).toEqual(jasmine.any(Board));
        expect(board.name).toEqual(boardResponse.name);
        expect(board.selfLink).toEqual(boardResponse._links.self.href);
        boardResponse.memberships.forEach((membership, index) => {
          expect(board.memberships[index].user.selfLink).toEqual(membership.user._links.self.href);
          expect(board.memberships[index].role).toEqual(membership.role);
        });
        done();
      }, fail);
      const req = httpTestingController.expectOne(request => request.url === url);
      req.flush(boardResponse);
    });
  });

  describe('Get Board', () => {

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

    it('should send a GET request', function (done) {
      boardService.getBoard('boardId').subscribe(done, fail);
      const req = httpTestingController.expectOne(request => request.url.includes('boardId'));
      expect(req.request.method).toEqual('GET');
      req.flush(boardResponse);
    });

    it('should return a board as response', function (done) {
      boardService.getBoard('boardId').subscribe((board) => {
        expect(board).toEqual(jasmine.any(Board));
        expect(board.name).toEqual('1. Board');
        done();
      }, fail);
      const req = httpTestingController.expectOne(request => request.url.includes('boardId'));
      req.flush(boardResponse);
    });
  });

  describe('renameBoard', () => {
    it('should send a PATCH request', function (done) {
      const board = new Board('boardName', {self: {href: 'boardLink'}});
      boardService.renameBoard(board).subscribe(done, fail);
      const req = httpTestingController.expectOne(board.selfLink);
      expect(req.request.method).toBe('PATCH');
      req.flush(null);
    });
    it('should send the new name in request body', function (done) {
      const board = new Board('boardName', {self: {href: 'boardLink'}});
      boardService.renameBoard(board).subscribe(done, fail);
      const req = httpTestingController.expectOne(board.selfLink);
      expect(req.request.body).toEqual({name: board.name});
      req.flush(null);
    });
  });
});
