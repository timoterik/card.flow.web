/*
 * Copyright © 2022-2023, DCCTech, Hungary
 */

import {User} from './user';

describe('User', () => {
  let user: User;
  beforeEach(() => {
      user = new User('username', 'first', 'last');
      user.setLinks({
        self: {
          href: 'selfLink'
        },
        image: {
          href: 'imageLink'
        },
        user: {
          href: 'userLink'
        }
      });
    }
  );

  it('should return imageLink', function () {
    expect(user.imageLink).toEqual('imageLink');
  });

  it('should return selfLink', function () {
    expect(user.selfLink).toEqual('selfLink');
  });

  it('should return imageLink', function () {
    expect(user.fullName).toEqual('first, last');
  });
});
