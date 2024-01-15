import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddEmployeeComponent } from './dialog-add-employee.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DialogAddEmployeeComponent', () => {
  let component: DialogAddEmployeeComponent;
  let fixture: ComponentFixture<DialogAddEmployeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule,
        provideFirebaseApp(() => initializeApp({ "projectId": "crm-system-ae75c", "appId": "1:586634445817:web:e96762ca1b11a9392ef328", "storageBucket": "crm-system-ae75c.appspot.com", "apiKey": "AIzaSyCYEAttoNZ3z1zuEPWRqNaC9JzYOE931z8", "authDomain": "crm-system-ae75c.firebaseapp.com", "messagingSenderId": "586634445817" })),
        provideFirestore(() => getFirestore()),
        MatFormFieldModule,
        FormsModule,
        MatInputModule,
        BrowserAnimationsModule
        ],
      declarations: [DialogAddEmployeeComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    });
    fixture = TestBed.createComponent(DialogAddEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
