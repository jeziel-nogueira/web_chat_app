import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { DefaultPrimaryInputComponent } from '../default-primary-input/default-primary-input.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-group-dialog',
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    DefaultPrimaryInputComponent,
    MatIcon
  ],
  templateUrl: './create-group-dialog.component.html',
  styleUrl: './create-group-dialog.component.scss'
})
export class CreateGroupDialogComponent {
  groupName: string = '';

  constructor(private dialogRef: MatDialogRef<CreateGroupDialogComponent>) {}

  send() {
    this.dialogRef.close(this.groupName);
  }

  cancel() {
    this.dialogRef.close();
  }
}
