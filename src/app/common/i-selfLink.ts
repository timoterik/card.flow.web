/*
 * Copyright © 2022-2023, DCCTech, Hungary
 */

import {ILink} from './i-link';

export interface ISelfLink {
  links: {
    self: ILink;
  };
  readonly selfLink: string;
}
