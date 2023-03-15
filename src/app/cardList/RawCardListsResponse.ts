/*
 * Copyright © 2022-2023, DCCTech, Hungary
 */

import {CardListResponse} from './CardListsResponse';
import {ILink} from '../common/i-link';

export interface RawCardListsResponse {
  _embedded: {
    cardLists: CardListResponse[]
  };
  _links: {
    self: ILink
  };
}
