import { Component, inject, OnInit } from '@angular/core';
import { Ticket } from 'src/models/ticket.class';
import { Firestore, collection, onSnapshot } from '@angular/fire/firestore';

@Component({
  selector: 'app-open-tickets',
  templateUrl: './open-tickets.component.html',
  styleUrls: ['./open-tickets.component.scss']
})
export class OpenTicketsComponent implements OnInit {
  allTickets = [];
  allTicketIds = [];


  private firestore: Firestore = inject(Firestore);


  ngOnInit(): void {
      onSnapshot(collection(this.firestore, 'tickets'), (ticket) => {
      this.allTickets = [];
      ticket.forEach(customerData => {
        this.allTickets.push(customerData.data())
        this.allTicketIds.push(customerData.id)
      })
    })
  }

}
