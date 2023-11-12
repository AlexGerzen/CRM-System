import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from 'src/models/user.class';
import { Firestore, collection, onSnapshot } from '@angular/fire/firestore';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user = new User();
  allUsers = [];
  allIds = [];

  private firestore: Firestore = inject(Firestore);


  constructor(public dialog: MatDialog) {

  }

  ngOnInit(): void {
    onSnapshot(collection(this.firestore, 'users'), (user) => {
      this.allUsers = [];
      user.forEach( userData => {
        this.allUsers.push(userData.data())
        this.allIds.push(userData.id)
      })
    })
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent)
  }
}