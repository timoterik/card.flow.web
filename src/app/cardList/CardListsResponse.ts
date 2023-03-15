/*
 * Copyright © 2022-2023, DCCTech, Hungary
 */

import {ILink} from '../common/i-link';

export interface CardListResponse {
  name: string;
  archived: boolean;
  _links: {
    self: ILink;
    cardList: ILink;
    board: ILink;
  };
}


