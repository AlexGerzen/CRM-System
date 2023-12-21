import { Component, inject, OnInit } from '@angular/core';
import { Firestore, collection, doc, onSnapshot, deleteDoc } from '@angular/fire/firestore';
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
    this.getTicketHistory();
  }

  /**
   * This function will get the finished tickets from the database
   */
  getTicketHistory() {
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

  /**
   * This function will transform all the dates to the right format
   * 
   * @param datesArray This is the array with dates which will be transformed
   * @param ticketArray This is the array where the dates come from
   */
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

  /**
   * This function will open the dialog for the ticket info
   * 
   * @param docId This is the id for the databse to get the ticketinfo
   */
  openDialog(docId) {
    this.dialog.open(DialogTicketInfoComponent, {
      data: {
        id: docId,
        collection: 'ticketHistory'
      },
    });
  }

  /**
   * This function will call the functions to delete a ticket
   * 
   * @param event This is to stop the click event from the parent element
   * @param index This is the index in the array of clicked ticket
   */
  async deleteTicket(event: Event, index) {
    event.stopPropagation();

    let docId = this.allTicketIds[index]

    this.deleteDocument(docId);
  }

  /**
   * This function will delete the document from the database
   * 
   * @param docId This is the id in the database of the ticket that will be deleted
   */
  deleteDocument(docId) {
    deleteDoc(doc(collection(this.firestore, 'ticketHistory'), docId))
      .then(() => { })
      .catch((error) => {
        console.error('Fehler beim Löschen des Dokuments:', error);
      });
  }

}
