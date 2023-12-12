import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogNotepadComponent } from '../dialog-notepad/dialog-notepad.component';

@Component({
  selector: 'app-notepad',
  templateUrl: './notepad.component.html',
  styleUrls: ['./notepad.component.scss']
})
export class NotepadComponent {

  constructor(public dialog: MatDialog) {

  }

  openDialog() {
    this.dialog.open(DialogNotepadComponent)
  }

}
