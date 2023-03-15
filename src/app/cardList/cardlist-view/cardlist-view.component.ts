/*
 * Copyright © 2022-2023, DCCTech, Hungary
 */

import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CardList} from '../CardList';
import 'rxjs/add/operator/switchMap';
import {CardListService} from '../card-list.service';

@Component({
  selector: 'nb-cardlist-view',
  templateUrl: './cardlist-view.component.html',
  styleUrls: ['./cardlist-view.component.scss']
})
export class CardlistViewComponent {

  @Input()
  cardLists: CardList[];

  @Input()
  boardId: string;

  @Output()
  cardListCreated = new EventEmitter<void>();

  constructor(private cardListService: CardListService) {
  }

  onCreated() {
    this.cardListCreated.emit();
  }

  onArchive(cardList: CardList) {
    this.cardListService.archiveCardList(cardList)
      .subscribe((archivedCardList) => {
        this.cardLists = this.cardLists
          .filter(cl => archivedCardList.selfLink !== cl.selfLink);
      });
  }
}
