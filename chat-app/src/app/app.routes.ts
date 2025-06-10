import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AuthGuardService } from './services/auth-guard.service';

export const routes: Routes = [
    {
        path: "",
        component: LoginPageComponent
    },
    {
        path: "register",
        component: RegisterPageComponent
    },
    {
        path: "messages",
        component: HomePageComponent,
        canActivate: [AuthGuardService]
    }
];
