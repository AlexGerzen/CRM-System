import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNotepadComponent } from './dialog-notepad.component';

describe('DialogNotepadComponent', () => {
  let component: DialogNotepadComponent;
  let fixture: ComponentFixture<DialogNotepadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogNotepadComponent]
    });
    fixture = TestBed.createComponent(DialogNotepadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
