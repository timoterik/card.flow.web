/*
 * Copyright © 2022-2023, DCCTech, Hungary
 */

import {ILink} from '../common/i-link';

interface UserLinks {
  self: ILink;
  user?: ILink;
  image: ILink;
}

export interface UserListResponse {
  _embedded: {
    users: UserResponse[]
  };
}

export interface UserResponse {
  username: string;
  roles?: string[];
  firstName: string;
  lastName: string;
  _links: UserLinks;
}

export class User {
  roles: string[];
  private links: UserLinks;

  constructor(public username: string,
              public firstName: string,
              public lastName: string,
              public image?: string,
              public password?: string) {

  }

  get imageLink() {
    return this.links.image.href;
  }

  get selfLink() {
    return this.links.self.href;
  }

  get fullName() {
    return `${this.firstName}, ${this.lastName}`;
  }

  static createUserFromResponse(userResponse: UserResponse) {
    const user = new User(userResponse.username, userResponse.firstName, userResponse.lastName);
    user.roles = userResponse.roles;
    user.setLinks(userResponse._links);
    return user;
  }

  setLinks(links: UserLinks) {
    this.links = links;
  }
}
