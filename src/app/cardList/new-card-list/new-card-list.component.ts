/*
 * Copyright © 2022-2023, DCCTech, Hungary
 */

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CardListService} from '../card-list.service';
import {CardList} from '../CardList';

@Component({
  selector: 'nb-new-card-list',
  templateUrl: './new-card-list.component.html',
  styleUrls: ['./new-card-list.component.scss']
})
export class NewCardListComponent implements OnInit/*,OnChanges*/ {

  @Input()
  boardId: string;

  name: string;

  @Output()
  created = new EventEmitter<CardList>();

  constructor(private cardlistservice: CardListService/*, private eRef: ElementRef*/) {
  }

  /*@HostListener('document:click', ['$event'])
  clickout(event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.name = '';
    }
  }*/
  ngOnInit() {
  }

  /*ngOnChanges(changes: SimpleChanges): void {
    this.boardId = changes['boardId'].currentValue;
  }*/

  saveNewCardList(event): void {
    event.preventDefault();
    this.name = this.name.trim();
    if (this.name) {
      this.cardlistservice.createNewCardList(this.name, this.boardId)
        .subscribe(cardList => {
          this.created.emit(cardList);
        });
      this.name = '';
    }
  }

  cancelNewCardList() {
    this.name = '';
  }
}
