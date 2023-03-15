/*
 * Copyright © 2022-2023, DCCTech, Hungary
 */

import {Component, OnInit} from '@angular/core';
import {BoardService} from '../board.service';
import {AuthService} from '../../common/auth.service';
import {Board} from '../board';
import {Router} from '@angular/router';

@Component({
  selector: 'nb-board-list-view',
  templateUrl: './board-list-view.component.html',
  styleUrls: ['./board-list-view.component.scss']
})
export class BoardListViewComponent implements OnInit {
  boards: Board[] = [];

  create = false;

  constructor(private bs: BoardService, private auth: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.auth.getCurrentUser().subscribe((user) => {
      if (user) {
        this.bs.getBoardsByUser(user).subscribe((boards) => {
          this.boards = boards;
        });
      }
    });
  }

  onSelect(board: Board) {
    this.router.navigate([board.frontEndLink]);
  }

  creationStarted() {
    this.create = true;
  }

  endCreation() {
    this.create = false;
  }
}
