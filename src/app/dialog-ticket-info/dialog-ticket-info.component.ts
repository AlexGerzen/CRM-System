import { Component, Inject, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Firestore, collection, doc, getDoc, setDoc, addDoc, deleteDoc, onSnapshot } from '@angular/fire/firestore';
import { Ticket } from 'src/models/ticket.class';

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
  allEmployees = [];


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DialogTicketInfoComponent>) {

  }

  ngOnInit(): void {
    this.getDocument(this.data.collection);
    this.getEmployees();
  }

  /**
   * This function will get all the data of the ticket from the database
   * 
   * @param id This is the id of the ticket in the database
   */
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

  /**
   * This funtion will get the employees from the database
   */
  getEmployees() {
    onSnapshot(collection(this.firestore, 'employees'), (employees) => {
      this.allEmployees = [];
      employees.forEach(employee => {
        this.allEmployees.push(employee.data())
      })
    })
  }

  /**
   * This function is used to transform the date to the correct format
   * 
   * @param rawDate This is the date but in the wrong format
   * @returns It returns the date in the correct format
   */
  transformDate(rawDate) {
    let date = new Date(rawDate);

    let year = date.getFullYear();
    let month = date.getMonth() + 1; // Monate beginnen bei 0 (Januar) bis 11 (Dezember), daher +1
    let day = date.getDate();

    let transformedDate = year + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day;

    return transformedDate
  }

  /**
   * This function will turn the edit mode on and off
   */
  switchEditMode() {
    if (this.edit) {
      this.edit = false;
    } else {
      this.edit = true;
      this.ticketInfoCopy = this.ticketInfo
      this.ticketInfoCopyDate = this.transformDateForCopy(this.ticketInfoCopy.dueDate)
    }
  }

  /**
   * This function is used to transform the date to the correct format
   * 
   * @param rawDate This is the date but in the wrong format
   * @returns It returns the date in the correct format
   */
  transformDateForCopy(rawDate) {
    return new Date(rawDate);
  }

  /**
   * This function will update the ticket in the database
   */
  async updateTicket() {
    this.ticketInfoCopy.dueDate = this.ticketInfoCopyDate.getTime();
    await (setDoc(doc(collection(this.firestore, 'tickets'), this.data.id), this.ticketInfoCopy.toJson()));
    this.dialogRef.close();
  }

  /**
   * This function will call all the functions to delete the ticket and add it to the finished tickets
   */
  async deleteTicket() {
    await this.addToHistory();
    this.deleteDocument();
    this.dialogRef.close();
  }

  /**
   * This function will add the finished ticket to the database
   */
  async addToHistory() {
    this.ticketInfo.ticketStatus = 'Finished';
    await addDoc(collection(this.firestore, 'ticketHistory'), this.ticketInfo.toJson())
  }

  /**
   * This function will delete the ticket from the database
   */
  deleteDocument() {
    deleteDoc(doc(collection(this.firestore, 'tickets'), this.data.id))
      .then(() => { })
      .catch((error) => {
        console.error('Fehler beim Löschen des Dokuments:', error);
      });
  }
}
