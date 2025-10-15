import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { LoginForm } from '../../../core/entities/login-form';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.apiUrl;
  private http = inject(HttpClient);

  constructor() {}

  login = (loginForm: LoginForm) => {
    return this.http.post(`${this.baseUrl}/login`, loginForm);
  };

  register = () => {
    this.http.post(`${this.baseUrl}/login`, {});
  };
}
