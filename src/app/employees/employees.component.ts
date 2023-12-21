import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Employee } from 'src/models/employee.class';
import { DialogAddEmployeeComponent } from '../dialog-add-employee/dialog-add-employee.component';
import { Firestore, collection, onSnapshot } from '@angular/fire/firestore';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent {
  allEmployees = [];
  allEmployeeIds = [];
  employee: Employee = new Employee();

  private firestore: Firestore = inject(Firestore);

  constructor(public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.getEmployees();
  }

  /**
   * This function will get the employees from the database
   */
  getEmployees() {
    onSnapshot(collection(this.firestore, 'employees'), (employee) => {
      this.allEmployees = [];
      employee.forEach(employeeData => {
        this.allEmployees.push(employeeData.data())
        this.allEmployeeIds.push(employeeData.id)
      })
    })
  }

  /**
   * This function will open the dialog
   */
  openDialog() {
    this.dialog.open(DialogAddEmployeeComponent)
  }

}
