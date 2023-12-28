import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OpenTicketsComponent } from './open-tickets/open-tickets.component';
import { AddTicketComponent } from './add-ticket/add-ticket.component';
import { FinishedTicketsComponent } from './finished-tickets/finished-tickets.component';
import { EmployeesComponent } from './employees/employees.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'employees', component: EmployeesComponent},
  {path: 'openTickets', component: OpenTicketsComponent},
  {path: 'addTicket', component: AddTicketComponent},
  {path: 'finishedTickets', component: FinishedTicketsComponent},
  {path: 'legalNotice', component: LegalNoticeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
