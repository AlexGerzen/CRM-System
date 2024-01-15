import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesComponent } from './employees.component';
import { MatDialogModule } from '@angular/material/dialog';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';

describe('EmployeesComponent', () => {
  let component: EmployeesComponent;
  let fixture: ComponentFixture<EmployeesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule,
        provideFirebaseApp(() => initializeApp({ "projectId": "crm-system-ae75c", "appId": "1:586634445817:web:e96762ca1b11a9392ef328", "storageBucket": "crm-system-ae75c.appspot.com", "apiKey": "AIzaSyCYEAttoNZ3z1zuEPWRqNaC9JzYOE931z8", "authDomain": "crm-system-ae75c.firebaseapp.com", "messagingSenderId": "586634445817" })),
        provideFirestore(() => getFirestore()),
        MatIconModule,
        MatCardModule,
        MatTooltipModule],
      declarations: [EmployeesComponent]
    });
    fixture = TestBed.createComponent(EmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
