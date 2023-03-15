/*
 * Copyright © 2022-2023, DCCTech, Hungary
 */

import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BoardService} from '../board.service';
import {Router} from '@angular/router';

@Component({
  selector: 'nb-board-create',
  templateUrl: './board-create.component.html',
  styleUrls: ['./board-create.component.scss']
})
export class BoardCreateComponent implements OnInit {

  boardName: string;

  @Output()
  creationEnded: EventEmitter<any> = new EventEmitter();

  constructor(private boardService: BoardService, private router: Router) {
  }

  ngOnInit() {
  }

  createBoard() {
    if (this.boardName) {
      this.creationEnded.emit();
      this.boardService.createBoard(this.boardName)
        .subscribe((board) => {
          this.router.navigate([board.frontEndLink]);
        });
    } else {
      this.cancelCreation();
    }
  }

  cancelCreation() {
    this.creationEnded.emit();
  }
}
