/*
 * Copyright © 2022-2023, DCCTech, Hungary
 */

import {inject, TestBed} from '@angular/core/testing';

import {CardListService} from './card-list.service';
import {RawCardListsResponse} from './RawCardListsResponse';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {environment} from '../../environments/environment';
import {CardList} from './CardList';
import {HttpClient} from '@angular/common/http';

describe('CardListService', () => {
  let http: HttpClient;
  let httpTestingController: HttpTestingController;
  let cls: CardListService;
  let url: string;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CardListService]
    });

    http = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    cls = TestBed.get(CardListService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', inject([CardListService], (service: CardListService) => {
    expect(service).toBeTruthy();
  }));

  describe('get lists for a board', () => {
    let boardId: string;
    let body: RawCardListsResponse;

    beforeEach(() => {
      boardId = '5aa78c244943e91b885485f4';
      url = '/cardLists/search/findByArchivedFalseAndBoard';
      body = {
        _embedded: {
          cardLists: [
            {
              archived: false,
              name: 'lista egy',
              _links: {
                self: {
                  href: environment.api_url + '/cardLists/5aa78c244943e91b885485f5'
                },
                cardList: {
                  href: environment.api_url + '/cardLists/5aa78c244943e91b885485f5'
                },
                board: {
                  href: environment.api_url + '/cardLists/5aa78c244943e91b885485f5/board'
                }
              }
            },
            {
              name: 'lista kettő',
              archived: false,

              _links: {
                self: {
                  href: environment.api_url + '/cardLists/5aa78c244943e91b885485f6'
                },
                cardList: {
                  href: environment.api_url + '/cardLists/5aa78c244943e91b885485f6'
                },
                board: {
                  href: environment.api_url + '/cardLists/5aa78c244943e91b885485f6/board'
                }
              }
            },
            {
              name: 'lista három',
              archived: false,
              _links: {
                self: {
                  href: environment.api_url + '/cardLists/5aa78c244943e91b885485f7'
                },
                cardList: {
                  href: environment.api_url + '/cardLists/5aa78c244943e91b885485f7'
                },
                board: {
                  href: environment.api_url + '/cardLists/5aa78c244943e91b885485f7/board'
                }
              }
            }
          ]
        },
        _links: {
          self: {
            href: environment.api_url + '/cardLists/search/findByBoard?board=' + environment.api_url + '/boards/5aa78c244943e91b885485f4'
          }
        }
      };
    });

    it('should send a GET request', function (done) {

      cls.getLists(boardId).subscribe((response) => {
        expect(response.length).toEqual(3);
        for (let i = 0; i < 3; i++) {
          const resp = response[i];
          const exp = body._embedded.cardLists[i];

          expect(resp.name).toEqual(exp.name);
          expect(resp.selfLink).toEqual(exp._links.self.href);
          expect(resp.cardListLink).toEqual(exp._links.cardList.href);
          expect(resp.boardLink).toEqual(exp._links.board.href);
        }
        done();
      }, fail);
      const req = httpTestingController.expectOne(request => request.url.includes(url));
      expect(req.request.method).toEqual('GET');
      req.flush(body);
    });
    it('query contains the board id', function (done) {
      cls.getLists(boardId).subscribe((response) => {
        expect(response.length).toEqual(3);
        for (let i = 0; i < 3; i++) {
          const resp = response[i];
          const exp = body._embedded.cardLists[i];

          expect(resp.name).toEqual(exp.name);
          expect(resp.selfLink).toEqual(exp._links.self.href);
          expect(resp.cardListLink).toEqual(exp._links.cardList.href);
          expect(resp.boardLink).toEqual(exp._links.board.href);
        }
        done();
      }, fail);
      const req = httpTestingController.expectOne(request => {
        return request.url.includes('board=' + `${environment.api_url}/boards/${boardId}`);
      });
      expect(req.request.method).toEqual('GET');
      req.flush(body);
    });
  });

  describe('create new List', () => {
    const boardId = '5aa78c244943e91b885485f4';
    const result = {
      archived: false,
      name: 'lista n',
      _links: {
        'self': {
          'href': 'http://localhost:8080/cardLists/5aa9238b4943e92920443c61'
        },
        'cardList': {
          'href': 'http://localhost:8080/cardLists/5aa9238b4943e92920443c61'
        },
        'board': {
          'href': 'http://localhost:8080/cardLists/5aa9238b4943e92920443c61/board'
        }
      }
    };
    const name = 'lista n';
    const requestObj = {
      name: name,
      board: `${environment.api_url}/boards/${boardId}`
    };
    beforeEach(() => {
      url = '/cardLists';
    });

    it('sends a post request to the correct url', (done) => {
      cls.createNewCardList(name, boardId).subscribe(() => done(), fail);

      const req = httpTestingController.expectOne(url);
      expect(req.request.method).toEqual('POST');
      req.flush(result);
    });

    it('should send name and boardID', function (done) {
      cls.createNewCardList(name, boardId).subscribe(() => done(), fail);
      const req = httpTestingController.expectOne(url);
      expect(req.request.body).toEqual(requestObj);
      req.flush(result);
    });

  });

  describe('archive List', () => {
    const body = {
      archived: true,
      name: 'lista n',
      _links: {
        self: {
          'href': 'http://localhost:8080/cardLists/5aa9238b4943e92920443c61'
        },
        cardList: {
          'href': 'http://localhost:8080/cardLists/5aa9238b4943e92920443c61'
        },
        board: {
          'href': 'http://localhost:8080/cardLists/5aa9238b4943e92920443c61/board'
        }
      }
    };
    const list = CardList.createCardListFromResponse(body);
    it('sends a patch request to the correct url', (done) => {
      cls.archiveCardList(list).subscribe((cl) => {
        expect(cl.name).toEqual(body.name);
        expect(cl.selfLink).toEqual(body._links.self.href);
        expect(cl.boardLink).toEqual(body._links.board.href);
        done();
      }, fail);
      const req = httpTestingController.expectOne(list.selfLink);
      expect(req.request.method).toEqual('PATCH');
      req.flush(body);
    });
  });
});
