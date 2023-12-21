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

  filteredTickets = [];
  search: string = '';

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
    this.getTickets();
  }

  /**
   * This function will get the tickets from the database
   */
  getTickets() {
    onSnapshot(collection(this.firestore, 'tickets'), (ticket) => {
      this.clearAllTickets();
      this.clearAllDates();
      this.allTickets = [];
      this.allTicketIds = [];
      ticket.forEach(ticketData => {
        this.allTickets.push(ticketData.data());
        this.allTicketIds.push(ticketData.id);

      })
      this.filter();
      this.changeScrollbar();
    });
  }

  /**
   * This function will call all the functions to filter the ticket after the search input
   */
  filter() {
    this.filteredTickets = [];
    this.clearAllTickets();
    this.filteredTickets = this.filterArray(this.allTickets, this.search);

    this.sortTicket();
    this.transformDates(this.allUrgentDates, this.allUrgentTickets);
    this.transformDates(this.allMiddleDates, this.allMiddleTickets);
    this.transformDates(this.allLowDates, this.allLowTickets);
  }

  /**
   * This function will filter the tickets after the search term
   * 
   * @param arr This is the array to filter
   * @param suchbegriff This is the search term
   * @returns It returns "true" while it is filtering and "false" when it is done filtering
   */
  private filterArray(arr: any[], searchTerm: string): any[] {
    return arr.filter(item => {
      for (const key in item) {
        if (typeof item[key] === 'string' && item[key].toLowerCase().includes(searchTerm)) {
          return true;
        }
        if (typeof item[key] === 'object') {
          if (this.filterArray([item[key]], searchTerm).length > 0) {
            return true;
          }
        }
      }
      return false;
    });
  }

  /**
   * This function will clear all the ticket arrays
   */
  clearAllTickets() {
    this.allUrgentTickets = [];
    this.allUrgentTicketIds = [];
    this.allMiddleTickets = [];
    this.allMiddleTicketIds = [];
    this.allLowTickets = [];
    this.allLowTicketIds = [];
  }

  /**
   * This function will clear all the date arrays
   */
  clearAllDates() {
    this.allLowDates = [];
    this.allMiddleDates = [];
    this.allUrgentDates = [];
  }

  /**
   * This function will transform all the dates
   * 
   * @param datesArray This is the array of dates which will be transformed
   * @param ticketArray This is the matching ticket array for the datearray
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
   * This function will sort the tickets to "urgent" "middle" and "low" priority
   */
  sortTicket() {
    for (let i = 0; i < this.filteredTickets.length; i++) {
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

  /**
   * This function will call all the functions to delete a ticket
   * 
   * @param event This is to prevent the parent click event
   * @param index This is the index of the ticket that will be deleted
   * @param urgencyIdArray This is the id array with the matching urgency
   * @param deleteInfo This is the delete status
   */
  async deleteTicket(event: Event, index: number, urgencyIdArray: string[], deleteInfo: 'Deleted' | 'Finished') {
    event.stopPropagation();

    let docId = urgencyIdArray[index];
    await this.addToHistory(docId, deleteInfo);
    this.deleteDocument(docId);
  }

  /**
   * This function will open the dialog with the ticket info
   * 
   * @param docId This is the id of the ticket that will be opened
   */
  openDialog(docId) {
    this.dialog.open(DialogTicketInfoComponent, {
      data: {
        id: docId,
        collection: 'tickets'
      },
    });
  }

  /**
   * This function will delete the ticket from the database
   * 
   * @param docId This is the id of the ticket that will be deleted
   */
  deleteDocument(docId) {
    deleteDoc(doc(collection(this.firestore, 'tickets'), docId))
      .then(() => { })
      .catch((error) => {
        console.error('Fehler beim Löschen des Dokuments:', error);
      });
  }

  /**
   * This function will add the deleted ticket to the ticket history database
   * 
   * @param docId This is the id of the deleted ticket
   * @param deleteInfo This is the delete status
   */
  async addToHistory(docId, deleteInfo) {
    await this.getDocument(docId)
    this.deletedTicket.ticketStatus = deleteInfo;
    this.addDocument();
  }

  /**
   * This function get the ticket from the database before it will be deleted
   * 
   * @param docId This is the id of the ticket that will be deleted
   */
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

  /**
   * This function will add a ticket to the finished tickets database
   */
  async addDocument() {
    await addDoc(collection(this.firestore, 'ticketHistory'), this.deletedTicket.toJson())
  }

  /**
   * This function will change the design of the scrollbar
   */
  changeScrollbar() {
    for (let i = 0; i < 3; i++) {
      let id = "ticketContainer" + i.toString();

      let element = document.getElementById(id);


      if (element) {
        var parentElement = element.parentElement;

        if (parentElement) {
          parentElement.classList.add('custom-scrollbar');
        }
      }
    }
  }
}