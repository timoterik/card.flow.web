/*
 * Copyright © 2022-2023, DCCTech, Hungary
 */

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NewCardListComponent} from './new-card-list.component';
import {FormsModule} from '@angular/forms';
import {CardListService} from '../card-list.service';
import {CardList} from '../CardList';
import {By} from '@angular/platform-browser';
import {of} from 'rxjs/observable/of';


describe('NewCardListComponent', () => {
  let component: NewCardListComponent;
  let fixture: ComponentFixture<NewCardListComponent>;

  const cls = jasmine.createSpyObj('CardListService', ['createNewCardList']);

  const cardListDumy = new CardList('new cardlist');

  const eventDummy = {
    called: 0,
    preventDefault() {
      this.called++;
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [NewCardListComponent],
      providers: [
        {provide: CardListService, useValue: cls}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCardListComponent);
    component = fixture.componentInstance;
    component.boardId = '123';
    fixture.detectChanges();
    eventDummy.called = 0;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Crating a new cardlist', () => {

      beforeEach(async (done) => {
        const inputDe = fixture.debugElement.query(By.css('.input-pad > input[name="name"]'));
        const inputEl = inputDe.nativeElement;
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          inputEl.value = 'new cardlist';
          inputEl.dispatchEvent(new Event('input'));
          fixture.whenStable().then(() => {
            done();
          });
        });
      });

      it('cancel clears name', () => {
        expect(component.name).toEqual('new cardlist');
        component.cancelNewCardList();
        expect(component.name).toEqual('');
        expect(component.name).toBeFalsy();
      });

      describe('should call create new card on the service', () => {
        const clsSpy = cls.createNewCardList.and.returnValue(of(cardListDumy));

        beforeEach(() => {
          component.created.subscribe((next) => {
            expect(next.name).toBeTruthy();
            expect(next.name).toEqual('new cardlist');
          });
          component.saveNewCardList(eventDummy);
        });

        afterEach(() => {
          clsSpy.calls.reset();
        });

        it('event should be prevented', () => {
          fixture.detectChanges();
          expect(eventDummy.called).toEqual(1);
        });


        it('cardListService.createNewCardList() should have been called ', () => {
          fixture.detectChanges();
          expect(clsSpy.calls.count()).toEqual(1);
        });

      });
    }
  );

  describe('Board can change', () => {
    beforeEach(async (done) => {
      const inputDe = fixture.debugElement.query(By.css('.input-pad > input[name="name"]'));
      const inputEl = inputDe.nativeElement;
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        inputEl.value = 'new cardlist';
        inputEl.dispatchEvent(new Event('input'));
        fixture.whenStable().then(() => {
          done();
        });
      });
    });

  });
});

