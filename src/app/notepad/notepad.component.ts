import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogNotepadComponent } from '../dialog-notepad/dialog-notepad.component';

@Component({
  selector: 'app-notepad',
  templateUrl: './notepad.component.html',
  styleUrls: ['./notepad.component.scss']
})
export class NotepadComponent {
  text: string = '';

  constructor(public dialog: MatDialog) {
    this.getFromLocalStorage();
  }

  /**
   * This function will open the dialog for the notepad
   */
  openDialog() {
    let dialogRef = this.dialog.open(DialogNotepadComponent, {
      disableClose: true,
      data: {
        text: this.text,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.text = result;
    });
  }

  /**
   * This function will check if there is a note in the local storage and show it on the notepad
   */
  getFromLocalStorage(): any | null {
    try {
      const serializedValue = localStorage.getItem('noteText');
      if (serializedValue !== null) {

        this.text = JSON.parse(serializedValue)
      }
    } catch (error) {
      console.error('Fehler beim Abrufen aus dem Local Storage:', error);
    }
  }

}