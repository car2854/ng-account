import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { AccountMemberForm } from '../../../core/entities/account-member-form';
import { getHeadersWithToken } from '../../../presentation/helpers/get-token-helper';

@Injectable({
  providedIn: 'root',
})
export class AccountMemberService {
  private baseUrl = environment.apiUrl;
  private http = inject(HttpClient);
  private url = `${this.baseUrl}/account_member`;

  public createAccountMember = (accountMemberForm: AccountMemberForm) =>
    this.http.post(this.url, accountMemberForm, {
      headers: getHeadersWithToken(),
    });
}
