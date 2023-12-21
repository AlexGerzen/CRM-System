import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Employee } from 'src/models/employee.class';

@Component({
  selector: 'app-dialog-add-employee',
  templateUrl: './dialog-add-employee.component.html',
  styleUrls: ['./dialog-add-employee.component.scss']
})
export class DialogAddEmployeeComponent {
  loading: boolean = false;
  employee: Employee = new Employee();
  private firestore: Firestore = inject(Firestore);

  constructor(public dialogRef: MatDialogRef<DialogAddEmployeeComponent>) {

  }

  /**
   * This function calls all the functions to safe the employee
   */
  async safeEmployee() {
    this.loading = true;
    await this.addDocument();
    this.loading = false;
    this.dialogRef.close();
  }

  /**
   * This function will safe the employee in the database
   */
  async addDocument() {
    await addDoc(collection(this.firestore, 'employees'), this.employee.toJson())
  }

}
