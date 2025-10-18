import { getHeadersWithToken, getToken } from './../../../presentation/helpers/get-token';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { LoginForm } from '../../../core/entities/login-form';
import { RegisterForm } from '../../../core/entities/register-form';
import { UserAuthModel } from '../../../core/models/user-auth-model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.apiUrl;
  private http = inject(HttpClient);

  constructor() {}

  login = (loginForm: LoginForm) => {
    return this.http.post<UserAuthModel>(`${this.baseUrl}/login`, loginForm);
  };

  register = (registerForm: RegisterForm) => {
    return this.http.post<UserAuthModel>(`${this.baseUrl}/register`, registerForm);
  };

  renewToken = () => {
    return this.http.post<UserAuthModel>(
      `${this.baseUrl}/token`,
      {},
      {
        headers: getHeadersWithToken(),
      }
    );
  };
}
