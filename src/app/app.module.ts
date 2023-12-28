import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import { OpenTicketsComponent } from './open-tickets/open-tickets.component';
import {MatTabsModule} from '@angular/material/tabs';
import { AddTicketComponent } from './add-ticket/add-ticket.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { DialogTicketInfoComponent } from './dialog-ticket-info/dialog-ticket-info.component';
import { CommonModule, DatePipe } from '@angular/common';
import { FinishedTicketsComponent } from './finished-tickets/finished-tickets.component';
import { EmployeesComponent } from './employees/employees.component';
import { DialogAddEmployeeComponent } from './dialog-add-employee/dialog-add-employee.component';
import { ClockComponent } from './clock/clock.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { UnassignedTicketsComponent } from './unassigned-tickets/unassigned-tickets.component';
import { NotepadComponent } from './notepad/notepad.component';
import { DialogNotepadComponent } from './dialog-notepad/dialog-notepad.component';
import { RankingComponent } from './ranking/ranking.component';
import {MatTableModule} from '@angular/material/table';
import { WidthAlertComponent } from './width-alert/width-alert.component';





@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    OpenTicketsComponent,
    AddTicketComponent,
    DialogTicketInfoComponent,
    FinishedTicketsComponent,
    EmployeesComponent,
    DialogAddEmployeeComponent,
    ClockComponent,
    LineChartComponent,
    PieChartComponent,
    UnassignedTicketsComponent,
    NotepadComponent,
    DialogNotepadComponent,
    RankingComponent,
    WidthAlertComponent
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    CommonModule,
    DatePipe,
    MatSelectModule,
    ReactiveFormsModule,
    MatMenuModule,
    AppRoutingModule,
    MatTabsModule,
    NoopAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatInputModule,
    NgApexchartsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    MatProgressBarModule,
    BrowserAnimationsModule,
    MatCardModule,
    provideFirebaseApp(() => initializeApp({"projectId":"crm-system-ae75c","appId":"1:586634445817:web:e96762ca1b11a9392ef328","storageBucket":"crm-system-ae75c.appspot.com","apiKey":"AIzaSyCYEAttoNZ3z1zuEPWRqNaC9JzYOE931z8","authDomain":"crm-system-ae75c.firebaseapp.com","messagingSenderId":"586634445817"})),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
