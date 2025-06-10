import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { DefaultPrimaryInputComponent } from '../default-primary-input/default-primary-input.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-friend-dialog',
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    DefaultPrimaryInputComponent,
    MatIcon
  ],
  templateUrl: './add-friend-dialog.component.html',
  styleUrl: './add-friend-dialog.component.scss'
})
export class AddFriendDialogComponent {
  email: string = '';

  constructor(private dialogRef: MatDialogRef<AddFriendDialogComponent>) {}

  addFriend() {
    this.dialogRef.close(this.email);
  }

  cancel() {
    this.dialogRef.close();
  }
}
