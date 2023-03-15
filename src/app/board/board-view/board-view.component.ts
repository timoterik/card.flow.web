/*
 * Copyright © 2022-2023, DCCTech, Hungary
 */

import {Component, OnInit} from '@angular/core';
import {Board} from '../board';
import {BoardService} from '../board.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CardListService} from '../../cardList/card-list.service';
import {CardList} from '../../cardList/CardList';

@Component({
  selector: 'nb-board-view',
  templateUrl: './board-view.component.html',
  styleUrls: ['./board-view.component.scss']
})
export class BoardViewComponent implements OnInit {
  boardId: string;
  cardLists: CardList[] = [];
  board: Board;
  editName = false;

  constructor(private boardService: BoardService,
              private activatedRoute: ActivatedRoute,
              private cardListService: CardListService,
              private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap
      .map(params => params.get('boardId'))
      .subscribe(id => {
        this.boardId = id;
        this.boardService.getBoard(id).subscribe((board) => this.board = board);
        this.cardListService.getLists(id).subscribe(cardLists => this.cardLists = cardLists);
      });
  }

  backToBoards() {
    this.router.navigate(['/boards']);
  }

  editFinished(board: Board) {
    if (board) {
      this.board = board;
    }
    this.editName = false;
  }

  refreshCardLists() {
    this.cardListService.getLists(this.boardId)
      .subscribe(cardLists => {
        this.cardLists = cardLists;
      });
  }

  editStarted() {
    this.editName = true;
  }
}
