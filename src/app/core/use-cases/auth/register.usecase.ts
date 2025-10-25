import { RegisterForm } from './../../entities/register-form';
import { inject, Injectable } from "@angular/core";
import { AuthService } from "../../../infrastructure/services/auth/auth.service";
import { tap } from 'rxjs';
import { UserAuthModel } from '../../models/user-auth-model';

@Injectable({ providedIn: 'root' })
export class RegisterUseCase {
  private authService = inject(AuthService);
  public execute = (registerForm: RegisterForm) => this.authService.register(registerForm).pipe(
    tap((resp: UserAuthModel) => {
      localStorage.setItem('token', resp.token);
    }
  ));
}
