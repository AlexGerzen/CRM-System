import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { Firestore, collection, doc, setDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent {
  userId: string;
  loading: boolean = false;
  user: User = new User();

  private firestore: Firestore = inject(Firestore);
  userCollection = collection(this.firestore, "users");

  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>) {

  }

  async safeUser() {
    this.loading = true;
    await (setDoc(doc(this.userCollection, this.userId), this.user.toJson()));
    this.dialogRef.close();
    this.loading = false;
  }

}
