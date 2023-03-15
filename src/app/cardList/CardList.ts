/*
 * Copyright © 2022-2023, DCCTech, Hungary
 */

import {CardListResponse} from './CardListsResponse';
import {ILink} from '../common/i-link';


interface CardListLinks {
  self: ILink;
  cardList: ILink;
  board: ILink;
}


export class CardList {

  private links: CardListLinks;

  constructor(name: string) {
    this._name = name;
  }

  private _name: string;

  get name(): string {
    return this._name;
  }

  get boardLink(): string {
    return this.links.board.href;
  }

  get cardListLink(): string {
    return this.links.cardList.href;
  }

  get selfLink(): string {
    return this.links.self.href;
  }

  static createCardListFromResponse(cardListInterface: CardListResponse) {
    const cl = new CardList(cardListInterface.name);
    cl.setLinks(cardListInterface._links);
    return cl;
  }

  setLinks(links: CardListLinks) {
    this.links = links;
  }
}
