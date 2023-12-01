import { Component, Inject, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Firestore, collection, doc, getDoc, setDoc, addDoc, deleteDoc } from '@angular/fire/firestore';
import { Ticket } from 'src/models/ticket.class';
import { OpenTicketsComponent } from '../open-tickets/open-tickets.component';

@Component({
  selector: 'app-dialog-ticket-info',
  templateUrl: './dialog-ticket-info.component.html',
  styleUrls: ['./dialog-ticket-info.component.scss']
})
export class DialogTicketInfoComponent implements OnInit {
  private firestore: Firestore = inject(Firestore);
  ticketInfo: Ticket;
  ticketInfoCopy: Ticket;
  ticketInfoCopyDate: Date;
  edit: boolean = false;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DialogTicketInfoComponent>) {

  }

  ngOnInit(): void {
    this.getDocument(this.data.collection);
  }

  async getDocument(id) {
    await getDoc(doc(collection(this.firestore, id), this.data.id))
      .then((docSnapshot) => {
        if (docSnapshot.exists()) {
          this.ticketInfo = new Ticket(docSnapshot.data());
        } else {
          console.log('Dokument nicht gefunden.');
        }
      })
      .catch((error) => {
        console.error('Fehler beim Auslesen des Dokuments:', error);
      });
  }

  transformDate(rawDate) {
    let date = new Date(rawDate);

    let year = date.getFullYear();
    let month = date.getMonth() + 1; // Monate beginnen bei 0 (Januar) bis 11 (Dezember), daher +1
    let day = date.getDate();

    let transformedDate = year + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day;

    return transformedDate
  }

  switchEditMode() {
    if (this.edit) {
      this.edit = false;
    } else {
      this.edit = true;
      this.ticketInfoCopy = this.ticketInfo
      this.ticketInfoCopyDate = this.transformDateForCopy(this.ticketInfoCopy.dueDate)
    }
  }

  transformDateForCopy(rawDate) {
    return new Date(rawDate);
  }

  async updateTicket() {
    this.ticketInfoCopy.dueDate = this.ticketInfoCopyDate.getTime();
    await (setDoc(doc(collection(this.firestore, 'tickets'), this.data.id), this.ticketInfoCopy.toJson()));
    this.dialogRef.close();
  }

  async deleteTicket() {
    await this.addToHistory();
    this.deleteDocument();
    this.dialogRef.close();
  }

  async addToHistory() {
    this.ticketInfo.ticketStatus = 'Finished';
    await this.addDocument();
  }

  async addDocument() {
    await addDoc(collection(this.firestore, 'ticketHistory'), this.ticketInfo.toJson())
  }

  deleteDocument() {
    deleteDoc(doc(collection(this.firestore, 'tickets'), this.data.id))
      .then(() => { })
      .catch((error) => {
        console.error('Fehler beim Löschen des Dokuments:', error);
      });
  }
}
