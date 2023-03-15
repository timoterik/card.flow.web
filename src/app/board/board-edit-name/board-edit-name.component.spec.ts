/*
 * Copyright © 2022-2023, DCCTech, Hungary
 */

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BoardEditNameComponent} from './board-edit-name.component';
import {FormsModule} from '@angular/forms';
import {BoardService} from '../board.service';
import {By} from '@angular/platform-browser';
import {of} from 'rxjs/observable/of';
import {Board} from '../board';
import {SimpleChange} from '@angular/core';


describe('BoardEditNameComponent', () => {
  const boardServiceSpies = jasmine.createSpyObj('BoardService', ['renameBoard']);
  // const ar = jasmine.createSpyObj('ActivatedRoute', ['paramMap']);
  let component: BoardEditNameComponent;
  let fixture: ComponentFixture<BoardEditNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      providers: [
        {provide: BoardService, useValue: boardServiceSpies},
      ],
      declarations: [BoardEditNameComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardEditNameComponent);
    component = fixture.componentInstance;
    component.board = new Board('boardName', {self: {href: 'boardLink'}});
    fixture.detectChanges();
    boardServiceSpies.renameBoard.and.returnValue(of(null));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call board service rename board', () => {
    const boardServiceSpy = boardServiceSpies.renameBoard;
    const name = 'newname';
    component.board.name = name;
    component.onNameModify();
    const args = boardServiceSpy.calls.first().args;
    expect(args[0]).toBe(component.board);
  });

  it('pressing the cancel button should emit', () => {
    let emitted = false;
    const cancelButton = fixture.debugElement.query(By.css('.cancel'));
    component.editCancelled.subscribe(event => emitted = true);
    cancelButton.triggerEventHandler('click', null);
    expect(emitted).toEqual(true);
  });

  it('should emit editcancelled if new name is undefined', (done) => {
    component.board.name = '';
    let emitted = false;
    component.editCancelled.subscribe(() => {
      emitted = true;
      done();
      expect(emitted).toEqual(true);
    });
    component.onNameModify();
  });

  it('should clone the board on change', function () {
    const board = new Board('changedBoardName', {self: {href: 'changedBoardLink'}});
    const cloneSpy = spyOn(board, 'clone');
    component.ngOnChanges({
      board: new SimpleChange(null, board, false)
    });
    expect(cloneSpy).toHaveBeenCalled();
  });
});
