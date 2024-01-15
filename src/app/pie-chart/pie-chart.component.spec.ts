import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieChartComponent } from './pie-chart.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { MatCardModule } from '@angular/material/card';

describe('PieChartComponent', () => {
  let component: PieChartComponent;
  let fixture: ComponentFixture<PieChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        provideFirebaseApp(() => initializeApp({"projectId":"crm-system-ae75c","appId":"1:586634445817:web:e96762ca1b11a9392ef328","storageBucket":"crm-system-ae75c.appspot.com","apiKey":"AIzaSyCYEAttoNZ3z1zuEPWRqNaC9JzYOE931z8","authDomain":"crm-system-ae75c.firebaseapp.com","messagingSenderId":"586634445817"})),
        provideFirestore(() => getFirestore()),
        MatCardModule
      ],
      declarations: [PieChartComponent]
    });
    fixture = TestBed.createComponent(PieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
