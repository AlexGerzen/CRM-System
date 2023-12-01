import { Component, inject, OnInit } from '@angular/core';
import { Firestore, collection, doc, onSnapshot, deleteDoc, getDoc, addDoc } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { DialogTicketInfoComponent } from '../dialog-ticket-info/dialog-ticket-info.component';

@Component({
  selector: 'app-finished-tickets',
  templateUrl: './finished-tickets.component.html',
  styleUrls: ['./finished-tickets.component.scss']
})
export class FinishedTicketsComponent implements OnInit {
  private firestore: Firestore = inject(Firestore);

  allTickets = [];
  allTicketIds = [];
  allDates = [];

  constructor(public dialog: MatDialog) {

  }

  ngOnInit(): void {
    onSnapshot(collection(this.firestore, 'ticketHistory'), (ticket) => {
      this.allTicketIds = [];
      this.allTickets = [];
      this.allDates = [];
      ticket.forEach(ticketData => {
        this.allTickets.push(ticketData.data());
        this.allTicketIds.push(ticketData.id);
      })
      this.transformDates(this.allDates, this.allTickets);
    })
  }

  transformDates(datesArray, ticketArray) {
    for (let i = 0; i < ticketArray.length; i++) {
      let date = new Date(ticketArray[i].dueDate);

      let year = date.getFullYear();
      let month = date.getMonth() + 1; // Monate beginnen bei 0 (Januar) bis 11 (Dezember), daher +1
      let day = date.getDate();

      let transformedDate = year + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day;

      datesArray.push(transformedDate);
    }
  }

  openDialog(docId) {
    this.dialog.open(DialogTicketInfoComponent, {
      data: {
        id: docId,
        collection: 'ticketHistory'
      },
    });
  }

  async deleteTicket(event: Event, index) {
    event.stopPropagation();

    let docId = this.allTicketIds[index]

    this.deleteDocument(docId);
  }

  deleteDocument(docId) {
    deleteDoc(doc(collection(this.firestore, 'ticketHistory'), docId))
      .then(() => { })
      .catch((error) => {
        console.error('Fehler beim Löschen des Dokuments:', error);
      });
  }

}
