import { AccountForm } from './../../../core/entities/account-form';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { getHeadersWithToken } from '../../../presentation/helpers/get-token';
import { AccountModel } from '../../../core/models/account-model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private baseUrl = environment.apiUrl;
  private http = inject(HttpClient);
  private url = `${this.baseUrl}/accounting`;

  public createAccount = (accountForm: AccountForm) =>
    this.http.post<AccountModel>(this.url, accountForm, {
      headers: getHeadersWithToken(),
    });

  public getAccounts = () =>
    this.http.get<AccountModel[]>(this.url, {
      headers: getHeadersWithToken(),
    });

  public getAccount = (id: number) =>
    this.http.get<AccountModel>(`${this.url}/${id}`, {
      headers: getHeadersWithToken(),
    });
}
