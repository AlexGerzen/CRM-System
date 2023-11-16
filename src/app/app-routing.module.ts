import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { CustomerInfoComponent } from './customer-info/customer-info.component';
import { OpenTicketsComponent } from './open-tickets/open-tickets.component';
import { CustomersComponent } from './customers/customers.component';
import { AddTicketComponent } from './add-ticket/add-ticket.component';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'user', component: UserComponent},
  {path: 'user/:id', component: UserDetailComponent},
  {path: 'customers', component: CustomersComponent},
  {path: 'openTickets', component: OpenTicketsComponent},
  {path: 'addTicket', component: AddTicketComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
