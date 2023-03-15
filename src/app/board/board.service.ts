/*
 * Copyright © 2022-2023, DCCTech, Hungary
 */

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {BoardListResponse} from './board-list-response';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import {AuthService} from '../common/auth.service';
import {BoardResponse} from './board-response';
import 'rxjs/add/operator/switchMap';
import {Board} from './board';

@Injectable()
export class BoardService {

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  getBoardsByUser(userLink): Observable<Board[]> {
    const url = `/boards/search/findByMembershipsUserAndArchivedIsFalse?user=${userLink}`;
    return this.http.get<BoardListResponse>(url)
      .map(response => {
        return response._embedded.boards.map(board => Board.createBoardFromBoardResponse(board));
      })
      .catch(err => {
        // TODO notify user about the HTTPError
        return Observable.of([]);
      });
  }

  createBoard(boardName: string): Observable<Board> {
    const url = '/boards';
    return this.authService.getCurrentUser().switchMap((userLink) => {
      const data = {
        name: boardName, memberships: [{
          role: 'ADMIN',
          user: userLink
        }]
      };
      return this.http.post<BoardResponse>(url, data)
        .map(response => Board.createBoardFromBoardResponse(response));
    });

  }

  getBoard(boardId: string): Observable<Board> {
    const url = '/boards/' + boardId;
    return this.http.get<BoardResponse>(url)
      .map(response => Board.createBoardFromBoardResponse(response));
  }

  renameBoard(board: Board) {
    return this.http.patch(board.selfLink, {name: board.name});
  }
}

