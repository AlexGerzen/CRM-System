import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingComponent } from './ranking.component';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

describe('RankingComponent', () => {
  let component: RankingComponent;
  let fixture: ComponentFixture<RankingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        provideFirebaseApp(() => initializeApp({ "projectId": "crm-system-ae75c", "appId": "1:586634445817:web:e96762ca1b11a9392ef328", "storageBucket": "crm-system-ae75c.appspot.com", "apiKey": "AIzaSyCYEAttoNZ3z1zuEPWRqNaC9JzYOE931z8", "authDomain": "crm-system-ae75c.firebaseapp.com", "messagingSenderId": "586634445817" })),
        provideFirestore(() => getFirestore()),
        MatCardModule,
        MatTableModule
      ],
      declarations: [RankingComponent]
    });
    fixture = TestBed.createComponent(RankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
