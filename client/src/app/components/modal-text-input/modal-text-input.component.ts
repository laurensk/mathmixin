import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface DialogData {
  title: string;
  subtitle: string;
  label: string;
  placeholder: string;
  value?: string;
}

@Component({
  selector: 'app-modal-text-input',
  templateUrl: './modal-text-input.component.html',
  styleUrls: ['./modal-text-input.component.scss'],
})
export class ModalTextInputComponent {
  value: string | undefined;

  constructor(
    public dialogRef: MatDialogRef<ModalTextInputComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.value = data.value;
  }
}
