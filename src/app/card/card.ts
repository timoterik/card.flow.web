/*
 * Copyright © 2022-2023, DCCTech, Hungary
 */

import {ILink} from '../common/i-link';

export interface CardResponse {
  'title': string;
  'archived': boolean;
  'pos': number;
  '_links': {
    'self': {
      'href': string
    },
    'card': {
      'href': string;
    },
    'cardList': {
      'href': string
    }
  };
}

export interface ListOfCardsResponse {
  '_embedded': {
    'cards': CardResponse[];
  };
  '_links': {
    'self': {
      'href': string;
    }
  };
}

export interface CardRequestBody {
  title: string;
  cardList: string;
  archived?: boolean;
  pos: number;
}

interface CardLinks {
  self?: ILink;
  card?: ILink;
  cardList?: ILink;
}

export class Card {
  constructor(public title: string,
              public pos = 0,
              public archived = false,
              private links?: CardLinks) {
  }

  get selfLink() {
    return this.links.self.href;
  }

  get cardListLink() {
    return this.links.cardList.href;
  }

  set cardListLink(link: string) {
    this.links.cardList.href = link;
  }

  static createCardFromResponse(cardResponse: CardResponse) {
    return new Card(cardResponse.title, cardResponse.pos, cardResponse.archived, cardResponse._links);
  }
}
