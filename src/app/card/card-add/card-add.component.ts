/*
 * Copyright © 2022-2023, DCCTech, Hungary
 */

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CardService} from '../card.service';
import {Card} from '../card';

@Component({
  selector: 'nb-card-add',
  templateUrl: './card-add.component.html',
  styleUrls: ['./card-add.component.scss']
})
export class CardAddComponent implements OnInit {

  @Input()
  cardListLink: string;

  @Input()
  pos: number;

  @Output()
  created: EventEmitter<Card> = new EventEmitter();

  @Output()
  cancelled = new EventEmitter();
  cardTitle = '';

  constructor(private cardService: CardService) {
  }

  ngOnInit() {
  }

  onAddCard() {
    this.cardService.createCard(this.cardTitle, this.cardListLink, this.pos)
      .subscribe((createdCard) => this.created.next(createdCard));
    this.cardTitle = '';
  }

  onInput(title: string) {
    this.cardTitle = title;
  }

  onCancel() {
    this.cancelled.emit();
  }
}
