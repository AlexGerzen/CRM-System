import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.scss']
})
export class AddTicketComponent {
  // Hier wird eine FormControl erstellt und initialisiert
  email = new FormControl('', [Validators.required, Validators.email]);

  // Beispiel für eine Funktion, um die Fehlermeldung abzurufen
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Email is required';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}

