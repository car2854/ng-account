import { RegisterForm } from './../../entities/register-form';
import { inject, Injectable } from "@angular/core";
import { AuthService } from "../../../infrastructure/services/auth/auth.service";

@Injectable({ providedIn: 'root' })
export class RegisterUseCase {
  private authService = inject(AuthService);
  execute = (registerForm: RegisterForm) => this.authService.register(registerForm);
}
