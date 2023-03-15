/*
 * Copyright © 2022-2023, DCCTech, Hungary
 */

import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CardlistViewComponent} from './cardlist-view.component';
import {MockComponent} from 'mock-component';
import {NewCardListComponent} from '../new-card-list/new-card-list.component';
import {CardListService} from '../card-list.service';
import {of} from 'rxjs/observable/of';
import {CardList} from '../CardList';
import {CardsComponent} from '../../card/cards/cards.component';


describe('CardlistViewComponent', () => {
  let component: CardlistViewComponent;
  let fixture: ComponentFixture<CardlistViewComponent>;

  const cardListServiceSpies = jasmine.createSpyObj('CardListService', ['archiveCardList']);

  function createCardList(name: string, cardListLink: string, boardLink: string) {
    const cl = new CardList(name);
    cl.setLinks({
      self: {href: cardListLink},
      cardList: {href: cardListLink},
      board: {href: boardLink}
    });
    return cl;
  }


  const dummyCardLists = [
    createCardList('list1', 'cardListLink1', 'boardLink'),
    createCardList('list2', 'cardListLink2', 'boardLink'),
    createCardList('list3', 'cardListLink3', 'boardLink'),
  ];
  const dummyboardId = '123';

  beforeEach(async(() => {
    cardListServiceSpies.archiveCardList.and.returnValue(of(dummyCardLists[1]));
    TestBed.configureTestingModule({
      declarations: [
        CardlistViewComponent,
        MockComponent(NewCardListComponent),
        MockComponent(CardsComponent)
      ],
      providers: [
        {provide: CardListService, useValue: cardListServiceSpies},
      ]
    })
      .compileComponents();
  }));

  beforeEach(async () => {
    fixture = TestBed.createComponent(CardlistViewComponent);
    component = fixture.componentInstance;
    component.boardId = dummyboardId;
    component.cardLists = dummyCardLists.map(cl => cl);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit event OnCreated', () => {
    const spy = spyOn(component.cardListCreated, 'emit');
    component.onCreated();
    expect(spy.calls.count()).toEqual(1);
  });

  describe('ArchiveCards', () => {
    const archiveSpy: jasmine.Spy = cardListServiceSpies.archiveCardList;
    afterEach(() => {
      archiveSpy.calls.reset();
    });
    it('should call archiveCardList, with the selected cardList', function () {
      component.onArchive(dummyCardLists[1]);
      expect(archiveSpy.calls.first().args).toEqual([dummyCardLists[1]]);
    });
    it('should remove the archived CardList', async(function () {
      const cardListCount = component.cardLists.length;
      component.onArchive(dummyCardLists[1]);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(component.cardLists.length).toBe(cardListCount - 1);
        expect(component.cardLists).not.toEqual(jasmine.arrayContaining([dummyCardLists[1]]));
      });
    }));
  });
});
