import { Component, inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Ticket } from 'src/models/ticket.class';

@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.scss']
})
export class AddTicketComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  titel = new FormControl('', [Validators.required]);
  urgency = new FormControl('', [Validators.required]);
  description = new FormControl('', [Validators.required]);
  company = new FormControl('', [Validators.required]);

  ticket = new Ticket();
  loading: boolean = false;
  dueDate: Date;

  private firestore: Firestore = inject(Firestore);

  constructor() {
    
  }



  async safeTicket() {
    this.loading = true;
    this.ticket.dueDate = this.dueDate.getTime();
    this.ticket.date = new Date();
    this.ticket.ticketNumber = this.createTicketnumber();
    this.ticket.ticketStatus = "Requested"
    await this.addDocument();
    this.loading = false;
  }

  createTicketnumber() {
    let timestamp = new Date().getTime();
    var random = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    var ticketNumber = timestamp + '' + random;
    ticketNumber = ticketNumber.slice(0, 10);
    console.log(ticketNumber);
    
    return ticketNumber;
  }

  async addDocument() {
    await addDoc(collection(this.firestore, 'tickets'), this.ticket.toJson())
  }

  getErrorMessageEmail() {
    if (this.email.hasError('required')) {
      return 'Email is required';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getErrorMessage(field: string) {
    return field + " is required"
  }
}

