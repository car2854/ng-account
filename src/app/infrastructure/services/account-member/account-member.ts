import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { AccountMemberForm } from '../../../core/entities/account-member-form';
import { getHeadersWithToken } from '../../../presentation/helpers/get-token-helper';
import { MemberModel } from '../../../core/models/member-model';

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

  public getAccountMembers = (accountId: number) =>
    this.http.get<MemberModel[]>(`${this.url}/${accountId}`, {
      headers: getHeadersWithToken(),
    });

  public deleteAccountMembers = (accountId: number, memberId: number) =>
    this.http.delete(`${this.url}/${accountId}/${memberId}`, {
      headers: getHeadersWithToken(),
    });
}
