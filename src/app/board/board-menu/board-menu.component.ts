/*
 * Copyright © 2022-2023, DCCTech, Hungary
 */

import {Component, Input, OnInit} from '@angular/core';
import {Board} from '../board';
import {BoardService} from '../board.service';


@Component({
  selector: 'nb-board-menu',
  templateUrl: './board-menu.component.html',
  styleUrls: ['./board-menu.component.scss']
})
export class BoardMenuComponent implements OnInit {
  menuHidden = true;
  membersView = false;

  @Input()
  board: Board;

  constructor(private boardService: BoardService) {
  }

  ngOnInit() {
  }

  displayMenu() {
    this.menuHidden = false;
  }

  hideMenu() {
    this.hideMembers();
    this.menuHidden = true;
  }

  showMembers() {
    this.membersView = true;
  }

  hideMembers() {
    this.membersView = false;
  }
}
