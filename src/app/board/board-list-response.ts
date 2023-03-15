/*
 * Copyright © 2022-2023, DCCTech, Hungary
 */

import {BoardResponse} from './board-response';

export interface BoardListResponse {
  _embedded: {
    boards: BoardResponse[]
  };
}
