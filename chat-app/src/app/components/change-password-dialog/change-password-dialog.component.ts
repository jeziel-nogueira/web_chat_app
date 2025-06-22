import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { DefaultPrimaryInputComponent } from '../default-primary-input/default-primary-input.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

interface ChangePasswordForm {
  currentPassword: FormControl<string>;
  newPassword: FormControl<string>;
  confirmPassword: FormControl<string>;
}

@Component({
  selector: 'app-change-password-dialog',
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    DefaultPrimaryInputComponent,
    MatIcon,
    ReactiveFormsModule
  ],
  templateUrl: './change-password-dialog.component.html',
  styleUrl: './change-password-dialog.component.scss'
})
export class ChangePasswordDialogComponent {
  form!: FormGroup<ChangePasswordForm>;

  constructor(
    private dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
    private toastService: ToastrService
  ) {
    this.form = new FormGroup({
      currentPassword: new FormControl('', { validators: [Validators.required], nonNullable: true }),
      newPassword: new FormControl('', { validators: [Validators.required, Validators.minLength(6)], nonNullable: true }),
      confirmPassword: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    });
  }

  send() {
    if (this.form.invalid || this.form.value.newPassword !== this.form.value.confirmPassword) {
      this.toastService.error("Verifique os dados");
      return;
    }

    const { newPassword } = this.form.value;
    this.dialogRef.close(newPassword);
  }

  cancel() {
    this.dialogRef.close();
  }
}
