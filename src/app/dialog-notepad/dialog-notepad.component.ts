import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-notepad',
  templateUrl: './dialog-notepad.component.html',
  styleUrls: ['./dialog-notepad.component.scss']
})
export class DialogNotepadComponent {
  text: string = '';

  constructor(public dialogRef: MatDialogRef<DialogNotepadComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.text = this.data.text
  }

  ngAfterViewInit() {
    this.textareaFullHeight();
  }

  closeDialog(): void {
    this.saveToLocalStorage(this.text)
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

  saveToLocalStorage(value: any): void {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem('noteText', serializedValue);
  } catch (error) {
    console.error('Fehler beim Speichern im Local Storage:', error);
  }
}

}
