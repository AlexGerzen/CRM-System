import { Component, OnInit, inject } from '@angular/core';
import { Firestore, collection, onSnapshot } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unassigned-tickets',
  templateUrl: './unassigned-tickets.component.html',
  styleUrls: ['./unassigned-tickets.component.scss']
})
export class UnassignedTicketsComponent implements OnInit {
  private firestore: Firestore = inject(Firestore);
  allTickets = [];
  unassignedCounter: number = 0;
  showCounter:boolean = false;

  constructor(private router: Router) {

  }

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
      if(this.allTickets[i].assignedEmployee == "None") {
        this.unassignedCounter++
      }
    }
    this.showCounter = true;
  }

  linkToOpenTickets() {
    this.router.navigate(['/openTickets']);
  }

}
