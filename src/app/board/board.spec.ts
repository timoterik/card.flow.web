/*
 * Copyright © 2022-2023, DCCTech, Hungary
 */

import {Board} from './board';

describe('Board', () => {
  it('should clone itself', function () {
    const board = new Board('boardName', {self: {href: 'boardLink'}});
    const clonedBoard = board.clone();
    expect(clonedBoard).not.toBe(board);
    expect(clonedBoard).toEqual(board);
  });
});
