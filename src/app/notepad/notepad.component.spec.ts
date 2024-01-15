import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotepadComponent } from './notepad.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

describe('NotepadComponent', () => {
  let component: NotepadComponent;
  let fixture: ComponentFixture<NotepadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule, MatCardModule, MatIconModule],
      declarations: [NotepadComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} }, // Mocken oder Simulieren von MatDialogRef
        { provide: MAT_DIALOG_DATA, useValue: {} },
       ]
    });
    fixture = TestBed.createComponent(NotepadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
