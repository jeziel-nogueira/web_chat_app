import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { DefaultPrimaryInputComponent } from '../../components/default-primary-input/default-primary-input.component';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


interface SignupForm {
  username: FormControl,
  email: FormControl,
  password: FormControl,
  passwordConfirm: FormControl
}

@Component({
  selector: 'app-register-page',
  imports: [
    DefaultLoginLayoutComponent,
    DefaultPrimaryInputComponent,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    ToastrService
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss'
})
export class RegisterPageComponent {
  signUpForm!: FormGroup<SignupForm>;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastService: ToastrService
  ) {
    this.signUpForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(6)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  submit() {
    this.authService.signup(this.signUpForm.value.email, this.signUpForm.value.username, this.signUpForm.value.password)
      .subscribe({
        next: () => {
          this.toastService.success("Conta criada com sucesso")
          this.router.navigate(["messages"]);
        },
        error: (error) => {
          if (error.status === 409) {
            this.toastService.error(error.error?.error);
          } else {
            this.toastService.error("Erro inesperado");
          }
        }
      })
  }

  navigate() {
    this.router.navigate([""]);
  }
}
