import { Component } from '@angular/core';
import { User } from 'src/models/user.class';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-diaolog-edit-address',
  templateUrl: './diaolog-edit-address.component.html',
  styleUrls: ['./diaolog-edit-address.component.scss']
})
export class DiaologEditAddressComponent {
  user: User = new User();
  loading: boolean = false;

  constructor(public dialogRef: MatDialogRef<DiaologEditAddressComponent>) {

  }

  safeUser() {
    
  }
}
