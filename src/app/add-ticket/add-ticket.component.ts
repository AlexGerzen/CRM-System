import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Firestore, collection, addDoc, onSnapshot } from '@angular/fire/firestore';
import { Ticket } from 'src/models/ticket.class';
import { Router } from '@angular/router';

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

  constructor(private fb: FormBuilder, private router: Router) {
    this.setTicketForm();
  }

  ngOnInit() {
    this.getEmployees();
  }

  /**
   * This function is used to set the form for the validation
   */
  setTicketForm() {
    this.ticketForm = this.fb.group({
      title: [{ value: '', disabled: this.loading }, [Validators.required]],
      contact: [{ value: '', disabled: this.loading }, [Validators.required, Validators.email]],
      urgency: [{ value: '', disabled: this.loading }, [Validators.required]],
      description: [{ value: '', disabled: this.loading }, [Validators.required]],
      company: [{ value: '', disabled: this.loading }, [Validators.required]],
      employee: [{ value: '', disabled: this.loading }, [Validators.required]],
      dueDate: [{ value: '', disabled: this.loading }],
    });
  }

  /**
   * This function calls all the functions to safe the ticket
   */
  safeTicket() {
    if (this.checkFields()) {
      this.loading = true;
      this.setTicket();
      this.addDocument().then(() => {
        this.clearFields();
        this.loading = false;
        this.redirectToOpenTickets();
      });
    }
  }

  /**
   * This function directs the user to the page "Tickets"
   */
  redirectToOpenTickets() {
    this.router.navigate(['/openTickets']);
  }

  /**
   * This function is used to set up the ticket
   */
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

  /**
   * This function to get the employees from the database
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
   * This function will create an individual ticketnumber for every created ticket
   * 
   * @returns It returns the ticketnumber
   */
  createTicketnumber() {
    let timestamp = new Date().getTime();
    var random = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    var ticketNumber = timestamp + '' + random;
    ticketNumber = ticketNumber.slice(0, 10);

    return ticketNumber;
  }

  /**
   * This function will add the ticket to the database
   */
  async addDocument() {
    await addDoc(collection(this.firestore, 'tickets'), this.ticket.toJson())
  }

  /**
   * This funtion checks the type of error for the contact input and returns the correct message for the situation
   * 
   * @returns It returns the  error message 
   */
  getErrorMessageEmail() {
    const controls = this.ticketForm.controls;

    if (controls['contact'].hasError('required')) {
      return 'Email is required';
    }
    return controls['contact'].hasError('email') ? 'Not a valid email' : '';
  }

  /**
   * This functions will create the error message for every inputfield exept the contact
   * 
   * @param field This is the field we need the error message for
   * @returns It returns the correct error message
   */
  getErrorMessage(field: string) {
    return field + " is required"
  }

  /**
   * This function clears all inputfields
   */
  clearFields() {
    this.ticket.title = '';
    this.ticket.description = '';
    this.ticket.company = '';
    this.ticket.contact = '';
    this.dueDate = null;
    this.ticket.urgency = '';
  }

  /**
   * This function will hide all error messages
   */
  hideAllErrors() {
    this.showTitleError = false;
    this.showContactError = false;
    this.showCompanyError = false;
    this.showDescriptionError = false;
    this.showUrgencyError = false;
    this.showEmployeeError = false;
  }

  /**
   * This function is used to check all the inputs
   * 
   * @returns It returns "true" if all the checks are passed
   */
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
