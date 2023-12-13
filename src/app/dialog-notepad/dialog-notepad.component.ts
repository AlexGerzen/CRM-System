import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-notepad',
  templateUrl: './dialog-notepad.component.html',
  styleUrls: ['./dialog-notepad.component.scss']
})
export class DialogNotepadComponent {
  text: string = 'Hallo';

  constructor(public dialogRef: MatDialogRef<DialogNotepadComponent>) {

  }

  ngAfterViewInit() {
    this.textareaFullHeight();
  }

  closeDialog(): void {
    this.dialogRef.close(this.text);
  }

  textareaFullHeight() {
    const element = document.querySelector('.mat-mdc-form-field-flex') as HTMLElement;
    if (element) {
      element.style.height = '100%';
    }

    const element2 = document.querySelector('.mat-mdc-form-field-infix') as HTMLElement;
    if (element2) {
      element2.style.height = '100%';
    }

    const element3 = document.querySelector('.mat-mdc-input-element') as HTMLElement;
    if (element3) {
      element3.style.height = '100%';
    }
  }

}
