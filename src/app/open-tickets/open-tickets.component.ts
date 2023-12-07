import { Component, inject, OnInit } from '@angular/core';
import { Ticket } from 'src/models/ticket.class';
import { Firestore, collection, doc, onSnapshot, deleteDoc, getDoc, addDoc } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { DialogTicketInfoComponent } from '../dialog-ticket-info/dialog-ticket-info.component';

@Component({
  selector: 'app-open-tickets',
  templateUrl: './open-tickets.component.html',
  styleUrls: ['./open-tickets.component.scss']
})
export class OpenTicketsComponent implements OnInit {
  allTickets = [];
  allTicketIds = [];

  allUrgentTickets = [];
  allUrgentTicketIds = [];
  allUrgentDates = [];

  allMiddleTickets = [];
  allMiddleTicketIds = [];
  allMiddleDates = [];

  allLowTickets = [];
  allLowTicketIds = [];
  allLowDates = [];

  deletedTicket: Ticket;


  private firestore: Firestore = inject(Firestore);

  constructor(public dialog: MatDialog) {

  }


  ngOnInit(): void {
    onSnapshot(collection(this.firestore, 'tickets'), (ticket) => {
      this.clearAllTickets();
      this.clearAllDates();
      ticket.forEach(ticketData => {
        this.allTickets.push(ticketData.data());
        this.allTicketIds.push(ticketData.id);

      })
      this.sortTicket();
      this.transformDates(this.allUrgentDates, this.allUrgentTickets);
      this.transformDates(this.allMiddleDates, this.allMiddleTickets);
      this.transformDates(this.allLowDates, this.allLowTickets);
    })
  }

  clearAllTickets() {
    this.allTickets = [];
    this.allTicketIds = [];
    this.allUrgentTickets = [];
    this.allUrgentTicketIds = [];
    this.allMiddleTickets = [];
    this.allMiddleTicketIds = [];
    this.allLowTickets = [];
    this.allLowTicketIds = [];
  }

  clearAllDates() {
    this.allLowDates = [];
    this.allMiddleDates = [];
    this.allUrgentDates = [];
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

  sortTicket() {
    for (let i = 0; i < this.allTickets.length; i++) {
      if (this.allTickets[i].urgency == 'Urgent') {
        this.allUrgentTickets.push(this.allTickets[i]);
        this.allUrgentTicketIds.push(this.allTicketIds[i]);
      } else if (this.allTickets[i].urgency == 'Middle') {
        this.allMiddleTickets.push(this.allTickets[i]);
        this.allMiddleTicketIds.push(this.allTicketIds[i])
      } else if (this.allTickets[i].urgency == 'Low') {
        this.allLowTickets.push(this.allTickets[i]);
        this.allLowTicketIds.push(this.allTicketIds[i]);
      }
    }
  }

  async deleteTicket(event: Event, index: number, urgencyIdArray: string[], deleteInfo: 'Deleted' | 'Finished') {
    event.stopPropagation();

    let docId = urgencyIdArray[index];
    await this.addToHistory(docId, deleteInfo);
    this.deleteDocument(docId);
  }

  openDialog(docId) {
    this.dialog.open(DialogTicketInfoComponent, {
      data: {
        id: docId,
        collection: 'tickets'
      },
    });
  }

  deleteDocument(docId) {
    deleteDoc(doc(collection(this.firestore, 'tickets'), docId))
      .then(() => { })
      .catch((error) => {
        console.error('Fehler beim Löschen des Dokuments:', error);
      });
  }

  async addToHistory(docId, deleteInfo) {
    await this.getDocument(docId)
    this.deletedTicket.ticketStatus = deleteInfo;
    this.addDocument();
  }

  async getDocument(docId) {
    await getDoc(doc(collection(this.firestore, 'tickets'), docId))
      .then((docSnapshot) => {
        if (docSnapshot.exists()) {
          this.deletedTicket = new Ticket(docSnapshot.data());
        } else {
          console.log('Dokument nicht gefunden.');
        }
      })
      .catch((error) => {
        console.error('Fehler beim Auslesen des Dokuments:', error);
      });
  }

  async addDocument() {
    await addDoc(collection(this.firestore, 'ticketHistory'), this.deletedTicket.toJson())
  }
}