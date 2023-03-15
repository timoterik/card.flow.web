/*
 * Copyright © 2022-2023, DCCTech, Hungary
 */

import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {BoardService} from '../board.service';
import {Board} from '../board';

@Component({
  selector: 'nb-board-edit-name',
  templateUrl: './board-edit-name.component.html',
  styleUrls: ['./board-edit-name.component.scss']
})
export class BoardEditNameComponent implements OnChanges {

  @Input()
  board: Board;

  @Output()
  nameEdited: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  editCancelled: EventEmitter<any> = new EventEmitter();

  constructor(private boardService: BoardService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.board = (changes.board.currentValue as Board).clone();
  }

  onNameModify() {
    if (this.board.name) {
      this.boardService.renameBoard(this.board).subscribe();
      this.nameEdited.emit(this.board);
    } else {
      this.onCancel();
    }
  }

  onCancel() {
    this.editCancelled.emit();
  }
}
