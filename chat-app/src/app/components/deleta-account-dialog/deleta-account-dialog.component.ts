import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { DefaultPrimaryInputComponent } from '../default-primary-input/default-primary-input.component';
import { MatIcon } from '@angular/material/icon';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

interface PassForm {
  deleteAccConfirm: FormControl<string>
}
@Component({
  selector: 'app-deleta-account-dialog',
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    DefaultPrimaryInputComponent,
    MatIcon,
    ReactiveFormsModule
  ],
  templateUrl: './deleta-account-dialog.component.html',
  styleUrl: './deleta-account-dialog.component.scss'
})
export class DeletaAccountDialogComponent {
  confirmCode: string = '';
  form!: FormGroup<PassForm>;

  constructor(
    private dialogRef: MatDialogRef<DeletaAccountDialogComponent>,
    private toastService: ToastrService
  ) {
    const random = Math.floor(1000 + Math.random() * 9000);
    this.confirmCode = random.toString();

    this.form = new FormGroup({
      deleteAccConfirm: new FormControl('', {
        validators: [
          Validators.required,
          Validators.pattern(/^\d{4}$/)
        ],
        nonNullable: true
      }),
    });
  }

  send() {
    if (this.form.invalid) {
      this.toastService.error("Código inválido");
      return;
    }

    const inputCode = this.form.value.deleteAccConfirm;

    if (inputCode !== this.confirmCode) {
      this.toastService.error("Código incorreto. Tente novamente.");
      return;
    }

    this.dialogRef.close(true);
  }


  cancel() {
    this.dialogRef.close(false);
  }

}
