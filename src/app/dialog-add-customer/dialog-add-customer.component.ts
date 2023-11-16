import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Customer } from 'src/models/customer-info.class';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-add-customer',
  templateUrl: './dialog-add-customer.component.html',
  styleUrls: ['./dialog-add-customer.component.scss']
})
export class DialogAddCustomerComponent {
  loading: boolean = false;
  customer: Customer = new Customer();
  private firestore: Firestore = inject(Firestore);

  constructor(public dialogRef: MatDialogRef<DialogAddCustomerComponent>) {

  }


  async safeUser() {
    this.loading = true;
    this.customer.openTicket = false;
    await this.addDocument();
    this.loading = false;
    this.dialogRef.close();
  }

  async addDocument() {
    await addDoc(collection(this.firestore, 'customers'), this.customer.toJson())
  }

}
