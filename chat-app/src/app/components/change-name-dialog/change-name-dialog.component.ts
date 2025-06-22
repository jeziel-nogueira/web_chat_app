import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { DefaultPrimaryInputComponent } from '../default-primary-input/default-primary-input.component';
import { MatIcon } from '@angular/material/icon';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

interface NameForm{
  newName:FormControl<string>;
}
@Component({
  selector: 'app-change-name-dialog',
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    DefaultPrimaryInputComponent,
    MatIcon,
    ReactiveFormsModule
  ],
  templateUrl: './change-name-dialog.component.html',
  styleUrl: './change-name-dialog.component.scss'
})
export class ChangeNameDialogComponent {
  form!:FormGroup<NameForm>;
  
  constructor(
    private dialogRef: MatDialogRef<ChangeNameDialogComponent>,
    private toastService: ToastrService
  ) {(
    this.form = new FormGroup({
      newName: new FormControl('', { validators: [Validators.required, Validators.minLength(6)], nonNullable: true }),
    })
  )}

  send() {
    if (this.form.invalid){
      this.toastService.error("Nome invalido");
      return
    }

    const { newName } = this.form.value;
    this.dialogRef.close(newName);
  }

  cancel() {
    this.dialogRef.close();
  }
}
