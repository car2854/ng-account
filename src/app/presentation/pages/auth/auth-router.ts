import { Routes } from "@angular/router";
import { LoginComponent } from "./login-page/login.component";
import { RegisterComponent } from "./register-page/register.component";
import { AuthComponent } from "./auth.component";

export const AUTH_ROUTES: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
];
