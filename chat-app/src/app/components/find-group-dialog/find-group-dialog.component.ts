import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { DefaultPrimaryInputComponent } from '../default-primary-input/default-primary-input.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-find-group-dialog',
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    DefaultPrimaryInputComponent,
    MatIcon
  ],
  templateUrl: './find-group-dialog.component.html',
  styleUrl: './find-group-dialog.component.scss'
})
export class FindGroupDialogComponent {
  groupName: string = '';

  constructor(private dialogRef: MatDialogRef<FindGroupDialogComponent>) {}

  send() {
    this.dialogRef.close(this.groupName);
  }

  cancel() {
    this.dialogRef.close();
  }
}
