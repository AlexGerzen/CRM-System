import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenTicketsComponent } from './open-tickets.component';
import { MatDialogModule } from '@angular/material/dialog';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('OpenTicketsComponent', () => {
  let component: OpenTicketsComponent;
  let fixture: ComponentFixture<OpenTicketsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        provideFirebaseApp(() => initializeApp({"projectId":"crm-system-ae75c","appId":"1:586634445817:web:e96762ca1b11a9392ef328","storageBucket":"crm-system-ae75c.appspot.com","apiKey":"AIzaSyCYEAttoNZ3z1zuEPWRqNaC9JzYOE931z8","authDomain":"crm-system-ae75c.firebaseapp.com","messagingSenderId":"586634445817"})),
        provideFirestore(() => getFirestore()),
        MatDialogModule,
        MatCardModule,
        MatFormFieldModule,
        MatTabsModule,
        FormsModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      declarations: [OpenTicketsComponent]
    });
    fixture = TestBed.createComponent(OpenTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
