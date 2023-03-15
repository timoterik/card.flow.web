/*
 * Copyright © 2022-2023, DCCTech, Hungary
 */

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CardsComponent} from './cards.component';
import {DragulaModule} from 'ng2-dragula';
import {MockComponent} from 'mock-component';
import {CardAddComponent} from '../card-add/card-add.component';
import {CardService} from '../card.service';

describe('CardsComponent', () => {
  let component: CardsComponent;
  let fixture: ComponentFixture<CardsComponent>;
  const cardServiceSpy = jasmine.createSpyObj('CardService', ['getCardsByCardList', 'saveCardPositionAndCardList', 'archiveCard']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DragulaModule],
      declarations: [
        CardsComponent,
        MockComponent(CardAddComponent)
      ],
      providers: [
        {provide: CardService, useValue: cardServiceSpy}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onDropModel', () => {

  });
});
