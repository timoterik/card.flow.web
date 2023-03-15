/*
 * Copyright © 2022-2023, DCCTech, Hungary
 */

import {BoardResponse} from './board-response';
import {ILink} from '../common/i-link';
import {environment} from '../../environments/environment';
import {User} from '../users/user';

export class Board {

  constructor(public name: string, private links: { self: ILink }, public memberships?: { role: string, user: User }[]) {
  }

  get selfLink() {
    return this.links.self.href;
  }

  get frontEndLink() {
    return this.selfLink.replace(environment.api_url, '');
  }

  static createBoardFromBoardResponse(boardResponse: BoardResponse) {
    const memberships = [];
    boardResponse.memberships.forEach((membership) => {
      const role = membership.role;
      const user = User.createUserFromResponse(membership._embedded.user);
      memberships.push({role, user});
    });
    return new Board(boardResponse.name, boardResponse._links, memberships);
  }

  clone() {
    return new Board(this.name, this.links, this.memberships);
  }
}
