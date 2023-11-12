import { Component, inject } from '@angular/core';
import { User } from 'src/models/user.class';
import { MatDialogRef } from '@angular/material/dialog';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';




@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent {
  user = new User;
  birthDate: Date;
  loading: boolean = false;

  private firestore: Firestore = inject(Firestore);
  
  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>) {

   }

  async safeUser() {
    this.loading = true;
    this.user.birthDate = this.birthDate.getTime();
    await this.addDocument();
    this.loading = false;
    this.dialogRef.close();
  }

  async addDocument() {
    await addDoc(collection(this.firestore, 'users'), this.user.toJson())
  }
}