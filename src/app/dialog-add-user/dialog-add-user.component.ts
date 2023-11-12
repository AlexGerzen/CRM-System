import { Component } from '@angular/core';
import { User } from 'src/models/user.class';
import { doc, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { MatDialogRef } from '@angular/material/dialog';




@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent {
  user = new User;
  birthDate: Date;
  loading: boolean = false;


  //Firebase
  firebaseConfig = {
    apiKey: "AIzaSyCYEAttoNZ3z1zuEPWRqNaC9JzYOE931z8",
    authDomain: "crm-system-ae75c.firebaseapp.com",
    projectId: "crm-system-ae75c",
    storageBucket: "crm-system-ae75c.appspot.com",
    messagingSenderId: "586634445817",
    appId: "1:586634445817:web:e96762ca1b11a9392ef328"
  };
  app = initializeApp(this.firebaseConfig);
  db = getFirestore(this.app);
  //
  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>) { }

  async safeUser() {
    this.loading = true;
    this.user.birthDate = this.birthDate.getTime();
    await this.addDocument();
    this.loading = false;
    this.dialogRef.close();
  }

  async addDocument() {
    await setDoc(doc(this.db, "users", this.user.firstName + this.user.lastName), this.user.toJson());
  }
}