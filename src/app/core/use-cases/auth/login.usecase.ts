import { LoginForm } from './../../entities/login-form';
import { inject, Injectable } from "@angular/core";
import { AuthService } from "../../../infrastructure/services/auth/auth.service";
import { tap } from 'rxjs';
import { UserAuthModel } from '../../models/user-auth-model';

@Injectable({providedIn: 'root'})
export class LoginUseCase {
  private authService = inject(AuthService);
  execute = (loginForm: LoginForm) => this.authService.login(loginForm).pipe(
    tap((resp: UserAuthModel) => {
      localStorage.setItem('token', resp.token);
    })
  );
}
