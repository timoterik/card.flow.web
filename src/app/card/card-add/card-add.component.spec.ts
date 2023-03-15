/*
 * Copyright © 2022-2023, DCCTech, Hungary
 */

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CardAddComponent} from './card-add.component';
import {CardService} from '../card.service';

describe('CardAddComponent', () => {
  let component: CardAddComponent;
  let fixture: ComponentFixture<CardAddComponent>;
  const cardListSpy = jasmine.createSpyObj('CardService', ['createCard']);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardAddComponent],
      providers: [{provide: CardService, useValue: cardListSpy}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
