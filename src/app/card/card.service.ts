/*
 * Copyright © 2022-2023, DCCTech, Hungary
 */

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Card, CardRequestBody, CardResponse, ListOfCardsResponse} from './card';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class CardService {
  apiURL = '/cards';

  constructor(private http: HttpClient) {
  }

  getCardsByCardList(cardList: string): Observable<Card[]> {
    return this.http.get<ListOfCardsResponse>(this.apiURL +
      '/search/findByCardListAndArchivedIsFalseOrderByPos?cardList=' + cardList)
      .map(response => response._embedded.cards.map(card => Card.createCardFromResponse(card)));
  }

  createCard(title: string, cardList: string, pos: number): Observable<Card> {
    const body: CardRequestBody = {title, cardList, pos};
    return this.http.post<CardResponse>(this.apiURL, body).map(res => Card.createCardFromResponse(res));
  }

  archiveCard(card: Card): Observable<Card> {
    return this.http.patch<CardResponse>(card.selfLink, {archived: true}).map(res => Card.createCardFromResponse(res));
  }

  saveCardPositionAndCardList(card: Card): Observable<Card> {
    return this.http.patch<CardResponse>(card.selfLink, {
      pos: card.pos,
      cardList: card.cardListLink
    }).map(res => Card.createCardFromResponse(res));
  }
}
