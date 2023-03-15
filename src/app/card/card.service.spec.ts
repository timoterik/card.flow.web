/*
 * Copyright © 2022-2023, DCCTech, Hungary
 */

import {inject, TestBed} from '@angular/core/testing';

import {CardService} from './card.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Card, CardResponse, ListOfCardsResponse} from './card';

describe('CardService', () => {
  let cs: CardService;
  let httpTestingController: HttpTestingController;
  let listOfCardsResponse: ListOfCardsResponse;
  let cardResponse: CardResponse;
  let cardToArchive: Card;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CardService]
    });
    cs = TestBed.get(CardService);
    httpTestingController = TestBed.get(HttpTestingController);

    listOfCardsResponse = {
      _embedded: {
        cards: [
          {
            title: 'Card1',
            archived: false,
            pos: 1,
            _links: {
              self: {
                href: 'Card1'
              },
              card: {
                href: 'Card1'
              },
              cardList: {
                href: 'CardList1'
              },
            }
          }
        ]
      },
      _links: {
        self: {
          href: 'asd'
        }
      }
    };
  });
  cardResponse = {
    title: 'Card1',
    archived: false,
    pos: 1,
    _links: {
      self: {
        href: 'Card1'
      },
      card: {
        href: 'Card1'
      },
      cardList: {
        href: 'CardList1'
      },
    }
  };
  cardToArchive = Card.createCardFromResponse(cardResponse);

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be cancelled', inject([CardService], (service: CardService) => {
    expect(service).toBeTruthy();
  }));

  describe('getCardsByCardList', () => {
    it('should send a GET Request', function (done) {
      cs.getCardsByCardList('CardList1').subscribe(done, fail);
      const req = httpTestingController.expectOne('/cards/search/findByCardListAndArchivedIsFalseOrderByPos?cardList=CardList1');
      expect(req.request.method).toEqual('GET');
      req.flush(listOfCardsResponse);
    });

    it('should return array of Cards', function (done) {
      cs.getCardsByCardList('cardListLink').subscribe((response) => {
        expect(response).toEqual(jasmine.any(Array));
        response.forEach((card, idx) => {
          expect(card).toEqual(jasmine.any(Card));
          expect(card.title).toEqual(listOfCardsResponse._embedded.cards[idx].title);
          done();
        });
      }, fail);
      const req = httpTestingController.expectOne('/cards/search/findByCardListAndArchivedIsFalseOrderByPos?cardList=cardListLink');
      req.flush(listOfCardsResponse);
    });
  });
  describe('createCard', () => {
    it('should send a POST Request', function (done) {
      cs.createCard('cardLink', 'cardListLink', 1).subscribe(done, fail);
      const req = httpTestingController.expectOne('/cards');
      expect(req.request.method).toEqual('POST');
      req.flush(cardResponse);
    });
    it('post request content', function (done) {
      cs.createCard('cardLink', 'cardListLink', 1).subscribe(done, fail);
      const req = httpTestingController.expectOne('/cards');
      expect(req.request.body.title).toEqual('cardLink');
      expect(req.request.body.cardList).toEqual('cardListLink');
      expect(req.request.body.pos).toEqual(1);
      req.flush(cardResponse);
    });
    it('should return a Card', function (done) {
      cs.createCard('cardLink', 'cardListLink', 1).subscribe((response) => {
        expect(response).toEqual(jasmine.any(Card));
        expect(response.title).toEqual(cardResponse.title);
        expect(response.cardListLink).toEqual(cardResponse._links.cardList.href);
        done();
      }, fail);
      const req = httpTestingController.expectOne('/cards');
      req.flush(cardResponse);
    });

  });

  describe('archiveCard', () => {
    it('should send a PATCH Request', function (done) {
      cs.archiveCard(cardToArchive).subscribe(done, fail);
      const req = httpTestingController.expectOne(cardToArchive.selfLink);
      expect(req.request.method).toEqual('PATCH');
      req.flush(cardResponse);
    });

    it('post request content', function (done) {
      cs.archiveCard(cardToArchive).subscribe(done, fail);
      const req = httpTestingController.expectOne(cardToArchive.selfLink);
      expect(req.request.body.archived).toEqual(true);
      req.flush(cardResponse);
    });
    it('should return an archived Card', function (done) {
      cs.archiveCard(cardToArchive).subscribe((response) => {
        expect(response).toEqual(jasmine.any(Card));
        expect(response.archived).toEqual(true);
        done();
      }, fail);
      const req = httpTestingController.expectOne(cardToArchive.selfLink);
      cardResponse.archived = true;
      req.flush(cardResponse);
    });
  });

  describe('saveCardPositionAndCardList', () => {

  });
});
