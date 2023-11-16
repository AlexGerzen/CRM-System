import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Firestore, collection, doc, getDoc, onSnapshot } from '@angular/fire/firestore';
import { User } from 'src/models/user.class';
import { MatDialog } from '@angular/material/dialog';
import { DiaologEditAddressComponent } from '../diaolog-edit-address/diaolog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';



@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit{
  userId : string;  // DocId for the user
  public userData: User = new User();
  private firestore: Firestore = inject(Firestore);
  userCollection = collection(this.firestore, "users");

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {
    
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get("id");
    this.getUser();
  }

  getUser() {
    const unsub = onSnapshot(doc(this.userCollection, this.userId), (userData) => {
      this.userData = new User(userData.data());
    })
  }

  editMenu() {
    const dialog = this.dialog.open(DiaologEditAddressComponent);
    dialog.componentInstance.user = new User(this.userData.toJson());
    dialog.componentInstance.userId =  this.userId;
  }

  editUserDetail() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User(this.userData.toJson());
    dialog.componentInstance.userId =  this.userId;
  }
}
