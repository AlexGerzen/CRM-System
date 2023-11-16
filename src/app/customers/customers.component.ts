import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Customer } from 'src/models/customer-info.class';
import { DialogAddCustomerComponent } from '../dialog-add-customer/dialog-add-customer.component';
import { Firestore, collection, onSnapshot } from '@angular/fire/firestore';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  customer: Customer = new Customer();
  allCustomers = [];
  allCustomersId = [];
  private firestore: Firestore = inject(Firestore);

  constructor(public dialog: MatDialog) {

  }

  ngOnInit(): void {
    onSnapshot(collection(this.firestore, 'customers'), (customer) => {
      this.allCustomers = [];
      customer.forEach(customerData => {
        this.allCustomers.push(customerData.data())
        this.allCustomersId.push(customerData.id)
      })
    })
  }

  openDialog() {
    this.dialog.open(DialogAddCustomerComponent)
  }
}
