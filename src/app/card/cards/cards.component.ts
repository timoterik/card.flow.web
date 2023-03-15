/*
 * Copyright © 2022-2023, DCCTech, Hungary
 */

import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Card} from '../card';
import {CardService} from '../card.service';
import 'rxjs/add/operator/switchMap';
import {DragulaService} from 'ng2-dragula';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'nb-card',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit, OnChanges {


  viewMode = '';
  cards: Card[] = [];
  @Input()
  cardListLink: string;
  maxPos = 0;
  private dropModelUpdated = false;
  private subscription: Subscription;

  constructor(private cardService: CardService,
              private dragulaService: DragulaService) {
    dragulaService.dropModel.subscribe((value) => {
      console.log(value[1].dataset.selfLink);
      this.onDropModel(value[1].dataset.selfLink);
      this.dropModelUpdated = true;
    });
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.subscription = this.cardService.getCardsByCardList(changes.cardListLink.currentValue)
      .subscribe(cardList => {
        this.cards = cardList;
        this.maxPos = this.cards.reduce((max, currentCard) => Math.max(max, currentCard.pos), 0);
      });
  }

  /**
   * This method is called for all the CardsComponent instances, no matter which is the source
   * and the target CardsComponent. This method calculates the new position of the card and
   * saves it with CardService.saveCardPositionAndCardList. The cardListLink is also saved,
   * this way moving the card from one CardList to another also works properly.
   * @param {string} cardLink
   */
  onDropModel(cardLink: string) {

    let prevPos = Number.MIN_VALUE;
    let cardIndex = Number.MIN_VALUE;
    let nextPos = Number.MAX_VALUE;
    let draggedCard: Card;

    if (this.cards.length) {

      console.log('cards', this.cards);

      if (this.cards.length === 1) {
        draggedCard = this.cards[0];
        draggedCard.pos = 65536;
        draggedCard.cardListLink = this.cardListLink;
        console.log('cardList', this.cardListLink);
        this.cardService.saveCardPositionAndCardList(draggedCard)
          .subscribe(updatedCard => console.log('card position updated', updatedCard));
        return;
      }

      for (let index = 0; index < this.cards.length; index++) {
        const card = this.cards[index];
        if (card.selfLink === cardLink) {
          console.log('found card', card, index);
          cardIndex = index;
          draggedCard = card;
        } else {
          if (cardIndex !== Number.MIN_VALUE) {
            nextPos = card.pos;
            break;
          } else {
            prevPos = card.pos;
          }
        }
      }

      if (!draggedCard) {
        // The current CardList does not contain the dragged Card, skipping further part of the method
        return;
      }

      if (cardIndex === 0) {
        // moved to the head of the list
        draggedCard.pos = nextPos / 2;
      } else if (cardIndex === this.cards.length - 1) {
        draggedCard.pos = prevPos + 65536;
      } else {
        draggedCard.pos = (prevPos + nextPos) / 2;
      }

      console.log('New position: ', draggedCard.pos);
      draggedCard.cardListLink = this.cardListLink;
      this.cardService.saveCardPositionAndCardList(draggedCard)
        .subscribe(updatedCard => console.log('card position updated', updatedCard));
    }
  }

  addCard() {
    this.viewMode = 'cardAdd';
  }

  onArchiveCard(card: Card) {
    this.cardService.archiveCard(card)
      .subscribe(archivedCard =>
        this.cards = this.cards.filter(c => (c !== card)));
  }

  onCreated(card) {
    this.cards.push(card);
    this.maxPos = Math.max(this.maxPos, card.pos);
  }

  onAddCancelled() {
    this.viewMode = '';
  }

  getCards() {
    return this.cards;
  }

}
