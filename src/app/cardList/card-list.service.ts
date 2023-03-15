/*
 * Copyright © 2022-2023, DCCTech, Hungary
 */

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RawCardListsResponse} from './RawCardListsResponse';
import {CardList} from './CardList';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import {CardListResponse} from './CardListsResponse';

@Injectable()
export class CardListService {
  private getUrl = `/cardLists/search/findByArchivedFalseAndBoard?board=${environment.api_url}/boards/`;
  private createUrl = `/cardLists`;

  constructor(private http: HttpClient) {
  }

  getLists(boardId: string): Observable<CardList[]> {
    return this.http.get<RawCardListsResponse>(this.getUrl + boardId)
      .map(rawCardLists => rawCardLists._embedded.cardLists)
      .map(cardLists => cardLists.map(cl => CardList.createCardListFromResponse(cl)));
  }

  createNewCardList(name: string, boardId: string): Observable<CardList> {
    return this.http.post<CardListResponse>(this.createUrl, {
      name: name,
      board: `${environment.api_url}/boards/${boardId}`
    }).map(cl =>
      CardList.createCardListFromResponse(cl));
  }

  archiveCardList(cardList: CardList): Observable<CardList> {
    return this.http.patch<CardListResponse>(cardList.selfLink, {archived: true})
      .map(cl => {
        return CardList.createCardListFromResponse(cl);
      });
  }
}
