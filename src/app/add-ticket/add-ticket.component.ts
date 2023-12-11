import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Firestore, collection, addDoc, onSnapshot } from '@angular/fire/firestore';
import { Ticket } from 'src/models/ticket.class';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.scss']
})
export class AddTicketComponent implements OnInit {
  ticketForm: FormGroup;

  showTitleError: boolean = false;
  showContactError: boolean = false;
  showCompanyError: boolean = false;
  showDescriptionError: boolean = false;
  showUrgencyError: boolean = false;
  showEmployeeError: boolean = false;

  ticket = new Ticket();
  loading: boolean = false;
  dueDate: Date;
  date;
  allEmployees = [];

  private firestore: Firestore = inject(Firestore);

  constructor(private fb: FormBuilder) {
    this.ticketForm = this.fb.group({
      title: ['', [Validators.required]],
      contact: ['', [Validators.required, Validators.email]],
      urgency: ['', [Validators.required]],
      description: ['', [Validators.required]],
      company: ['', [Validators.required]],
      employee: ['', [Validators.required]],
      dueDate: [],
    });
  }

  ngOnInit() {
    this.getEmployees();
  }

  safeTicket() {
    console.log(this.ticketForm.controls['title'].value);

    if (this.checkFields()) {
      this.loading = true;
      this.setTicket();
      this.addDocument().then(() => {
        this.clearFields();
        this.loading = false;
      });
    }
  }

  setTicket() {
    this.ticket.title = this.ticketForm.controls['title'].value;
    this.ticket.description = this.ticketForm.controls['description'].value;
    this.ticket.contact = this.ticketForm.controls['contact'].value;
    this.ticket.company = this.ticketForm.controls['company'].value;
    this.ticket.assignedEmployee = this.ticketForm.controls['employee'].value;
    this.ticket.urgency = this.ticketForm.controls['urgency'].value;
    this.date = new Date();
    this.ticket.date = this.date.getTime();
    this.ticket.ticketStatus = "Requested";
    this.ticket.ticketNumber = this.createTicketnumber();
    this.ticket.dueDate = this.ticketForm.controls['dueDate'].value.getTime();
  }

  getEmployees() {
    onSnapshot(collection(this.firestore, 'employees'), (employees) => {
      this.allEmployees = [];
      employees.forEach(employee => {
        this.allEmployees.push(employee.data())
      })
    })
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
    const controls = this.ticketForm.controls;

    if (controls['contact'].hasError('required')) {
      return 'Email is required';
    }
    return controls['contact'].hasError('email') ? 'Not a valid email' : '';
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
    this.showEmployeeError = false;
  }

  checkFields() {
    this.hideAllErrors();

    const controls = this.ticketForm.controls;

    if (controls['title'].hasError('required')) {
      this.showTitleError = true;
      return false;
    }
    if (controls['description'].hasError('required')) {
      this.showDescriptionError = true;
      return false;
    }
    if (controls['company'].hasError('required')) {
      this.showCompanyError = true;
      return false;
    }
    if (controls['contact'].hasError('required')) {
      this.showContactError = true;
      return false;
    }
    if (controls['urgency'].hasError('required')) {
      this.showUrgencyError = true;
      return false;
    }
    if (controls['employee'].hasError('required')) {
      this.showEmployeeError = true;
      return false;
    }
    return true;
  }

}
