import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { DefaultLoginLayoutComponent } from "../../components/default-login-layout/default-login-layout.component";
import { DefaultPrimaryInputComponent } from "../../components/default-primary-input/default-primary-input.component";
import { error } from 'console';
interface loginForm {
  email: FormControl,
  password: FormControl
}

@Component({
  selector: 'app-login-page',
  imports: [
    DefaultLoginLayoutComponent,
    DefaultPrimaryInputComponent,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    ToastrService
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  loginForm!: FormGroup<loginForm>;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastService: ToastrService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  submit() {
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe({
        next: () => this.router.navigate(["messages"]),
        error: (err) => {
          const message = err.error?.error || 'Erro inesperado';
          this.toastService.error(message);
        }
      })
    this.router.navigate(["messages"]);
  }

  navigate() {
    this.router.navigate(["register"]);
  }
}
