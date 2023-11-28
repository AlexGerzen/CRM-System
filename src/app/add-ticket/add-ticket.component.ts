import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Ticket } from 'src/models/ticket.class';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.scss']
})
export class AddTicketComponent implements OnInit {
  contact = new FormControl('', [Validators.required, Validators.email]);
  titel = new FormControl('', [Validators.required]);
  urgency = new FormControl('', [Validators.required]);
  description = new FormControl('', [Validators.required]);
  company = new FormControl('', [Validators.required]);

  showTitleError: boolean = false;
  showContactError: boolean = false;
  showCompanyError: boolean = false;
  showDescriptionError: boolean = false;
  showUrgencyError: boolean = false;

  ticket = new Ticket();
  loading: boolean = false;
  dueDate: Date;
  date;

  private firestore: Firestore = inject(Firestore);

  constructor() {

  }

  ngOnInit() {

  }

  async safeTicket() {
    if (this.checkFields()) {
      this.loading = true;
      this.ticket.dueDate = this.dueDate.getTime();
      this.date = new Date();
      this.ticket.date = this.date.getTime();
      this.ticket.ticketNumber = this.createTicketnumber();
      this.ticket.ticketStatus = "Requested"
      await this.addDocument();
      this.clearFields()
      this.loading = false;
    }

  }

  createTicketnumber() {
    let timestamp = new Date().getTime();
    var random = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    var ticketNumber = timestamp + '' + random;
    ticketNumber = ticketNumber.slice(0, 10);

    return ticketNumber;
  }

  async addDocument() {
    await addDoc(collection(this.firestore, 'tickets'), this.ticket.toJson())
  }

  getErrorMessageEmail() {
    if (this.contact.hasError('required')) {
      return 'Email is required';
    }
    return this.contact.hasError('email') ? 'Not a valid email' : '';
  }

  getErrorMessage(field: string) {
    return field + " is required"
  }

  clearFields() {
    this.ticket.title = '';
    this.ticket.description = '';
    this.ticket.company = '';
    this.ticket.contact = '';
    this.dueDate = null;
    this.ticket.urgency = '';
  }

  hideAllErrors() {
    this.showTitleError = false;
    this.showContactError = false;
    this.showCompanyError = false;
    this.showDescriptionError = false;
    this.showUrgencyError = false;
  }

  checkFields() {
    this.hideAllErrors();

    if (this.titel.invalid) {
      this.showTitleError = true;
      return false;
    }
    if (this.description.invalid) {
      this.showDescriptionError = true;
      return false;
    }
    if (this.company.invalid) {
      this.showCompanyError = true;
      return false;
    }
    if (this.contact.invalid) {
      this.showContactError = true;
      return false;
    }
    if (this.urgency.invalid) {
      this.showUrgencyError = true;
      return false;
    }
    return true;
  }

}
