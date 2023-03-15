/*
 * Copyright © 2022-2023, DCCTech, Hungary
 */

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BoardCreateComponent} from './board-create.component';
import {BoardService} from '../board.service';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';
import {of} from 'rxjs/observable/of';
import {TemplateComponent} from '../../common/template/template.component';
import {Board} from '../board';


describe('BoardCreateComponent', () => {
  let component: BoardCreateComponent;
  let fixture: ComponentFixture<BoardCreateComponent>;

  const bs = jasmine.createSpyObj('BoardService', ['createBoard']);
  const router = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [BoardCreateComponent, TemplateComponent],
      providers: [
        {provide: BoardService, useValue: bs},
        {provide: Router, useValue: router}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('html should contain a boardName element', () => {
    const de = fixture.debugElement;
    const boardName: HTMLInputElement = de.query(By.css('#boardName')).nativeElement;
    expect(boardName).toBeTruthy();
  });

  it('should call BoardRepository createBoard', () => {
    const createSpy: jasmine.Spy = bs.createBoard.and.returnValue(of());
    component.boardName = 'boardName';
    component.createBoard();
    expect(createSpy.calls.first().args).toEqual(['boardName']);
  });

  it('should navigate to /boards/boardId', () => {
    component.boardName = 'boardName';
    bs.createBoard.and.returnValue(of(new Board('boardName', {self: {href: 'boardLink'}})));
    const navigateSpy: jasmine.Spy = router.navigate;
    component.createBoard();
    expect(navigateSpy.calls.first().args).toEqual([['boardLink']]);
  });

  it('should emit creationEnded if new board name is undefined', () => {
    let emit = false;
    component.creationEnded.subscribe(() => emit = true);
    component.createBoard();
    expect(emit).toBe(true);
  });
});
