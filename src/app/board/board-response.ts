/*
 * Copyright © 2022-2023, DCCTech, Hungary
 */

import {ILink} from '../common/i-link';
import {UserResponse} from '../users/user';

export interface BoardResponse {
  name: string;
  memberships: Array<{ role: string, _embedded: { user: UserResponse } }>;
  _links: {
    self: ILink;
    board: ILink;
  };
}
