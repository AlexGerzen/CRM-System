import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTicketInfoComponent } from './dialog-ticket-info.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

describe('DialogTicketInfoComponent', () => {
  let component: DialogTicketInfoComponent;
  let fixture: ComponentFixture<DialogTicketInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule,
        provideFirebaseApp(() => initializeApp({ "projectId": "crm-system-ae75c", "appId": "1:586634445817:web:e96762ca1b11a9392ef328", "storageBucket": "crm-system-ae75c.appspot.com", "apiKey": "AIzaSyCYEAttoNZ3z1zuEPWRqNaC9JzYOE931z8", "authDomain": "crm-system-ae75c.firebaseapp.com", "messagingSenderId": "586634445817" })),
        provideFirestore(() => getFirestore()),
        MatCardModule,
        MatIconModule],
      declarations: [DialogTicketInfoComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ]
    });
    fixture = TestBed.createComponent(DialogTicketInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
