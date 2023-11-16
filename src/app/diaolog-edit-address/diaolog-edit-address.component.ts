import { Component, inject, OnInit } from '@angular/core';
import { User } from 'src/models/user.class';
import { MatDialogRef } from '@angular/material/dialog';
import { Firestore, collection, doc, setDoc } from '@angular/fire/firestore';


@Component({
  selector: 'app-diaolog-edit-address',
  templateUrl: './diaolog-edit-address.component.html',
  styleUrls: ['./diaolog-edit-address.component.scss']
})
export class DiaologEditAddressComponent implements OnInit {
  user: User = new User();
  userId: string;
  loading: boolean = false;


  private firestore: Firestore = inject(Firestore);
  userCollection = collection(this.firestore, "users");

  constructor(public dialogRef: MatDialogRef<DiaologEditAddressComponent>) {

  }

  ngOnInit(): void {
  }

  async safeUser() {
    this.loading = true;
    await (setDoc(doc(this.userCollection, this.userId), this.user.toJson()));
    this.dialogRef.close();
    this.loading = false;
  }

  
}
