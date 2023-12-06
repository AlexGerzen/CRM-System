import { Component, inject } from '@angular/core';
import { Firestore, collection, doc, onSnapshot, deleteDoc, getDoc, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-dashboard-total-tickets',
  templateUrl: './dashboard-total-tickets.component.html',
  styleUrls: ['./dashboard-total-tickets.component.scss']
})
export class DashboardTotalTicketsComponent {
  allTickets = [];
  allUrgentTickets = [];
  allMiddleTickets = [];
  allLowTickets = [];

  private firestore: Firestore = inject(Firestore);

  ngOnInit(): void {
    onSnapshot(collection(this.firestore, 'tickets'), (ticket) => {
      this.allTickets = [];
      ticket.forEach(ticketData => {
        this.allTickets.push(ticketData.data());
      })
      this.sortTicket();
    })
  }

  sortTicket() {
    for (let i = 0; i < this.allTickets.length; i++) {
      if (this.allTickets[i].urgency == 'Urgent') {
        this.allUrgentTickets.push(this.allTickets[i]);
      } else if (this.allTickets[i].urgency == 'Middle') {
        this.allMiddleTickets.push(this.allTickets[i]);
      } else if (this.allTickets[i].urgency == 'Low') {
        this.allLowTickets.push(this.allTickets[i]);
      }
    }
  }


}
