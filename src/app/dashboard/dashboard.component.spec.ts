import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { NotepadComponent } from '../notepad/notepad.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LineChartComponent } from '../line-chart/line-chart.component';
import { PieChartComponent } from '../pie-chart/pie-chart.component';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { UnassignedTicketsComponent } from '../unassigned-tickets/unassigned-tickets.component';
import { RankingComponent } from '../ranking/ranking.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatCardModule,
        MatIconModule,
        MatTableModule,
        provideFirebaseApp(() => initializeApp({"projectId":"crm-system-ae75c","appId":"1:586634445817:web:e96762ca1b11a9392ef328","storageBucket":"crm-system-ae75c.appspot.com","apiKey":"AIzaSyCYEAttoNZ3z1zuEPWRqNaC9JzYOE931z8","authDomain":"crm-system-ae75c.firebaseapp.com","messagingSenderId":"586634445817"})),
        provideFirestore(() => getFirestore()),
      ],
      declarations: [DashboardComponent, NotepadComponent, LineChartComponent, PieChartComponent, UnassignedTicketsComponent, RankingComponent],
    });
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
