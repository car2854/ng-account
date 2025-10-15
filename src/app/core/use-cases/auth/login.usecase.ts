import { LoginForm } from './../../entities/login-form';
import { inject, Injectable } from "@angular/core";
import { AuthService } from "../../../infrastructure/services/auth/auth.service";

@Injectable({providedIn: 'root'})
export class LoginUseCase {
  private authService = inject(AuthService);
  execute = (loginForm: LoginForm) => this.authService.login(loginForm);
}
