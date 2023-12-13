import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogNotepadComponent } from '../dialog-notepad/dialog-notepad.component';

@Component({
  selector: 'app-notepad',
  templateUrl: './notepad.component.html',
  styleUrls: ['./notepad.component.scss']
})
export class NotepadComponent {
  text: string = 'moin';

  constructor(public dialog: MatDialog) {

  }

  openDialog() {
    let dialogRef = this.dialog.open(DialogNotepadComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('Variable "text" vom Dialog erhalten:', result);
      this.text = result;
    });
  }

}



