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

  /**
   * This function is used to close the Notepad
   */
  closeDialog(): void {
    this.saveToLocalStorage(this.text)
    this.dialogRef.close(this.text);
  }

  /**
   * This function is used to set the textarea to full height (it done like that because the elements generated by angular material only appears when the page is build in the browser)
   */
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

  /**
   * This function will safe the text in the local storage
   * 
   * @param value This is the text which will be safed in the local storage
   */
  saveToLocalStorage(value: any): void {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem('noteText', serializedValue);
    } catch (error) {
      console.error('Fehler beim Speichern im Local Storage:', error);
    }
  }

}
