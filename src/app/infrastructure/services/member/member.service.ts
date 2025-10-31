import { MemberForm } from './../../../core/entities/member-form';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { getHeadersWithToken } from '../../../presentation/helpers/get-token-helper';
import { MemberModel } from '../../../core/models/member-model';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private baseUrl = environment.apiUrl;
  private url = `${this.baseUrl}/member`;
  private httpClient = inject(HttpClient);

  public createMember = (member: MemberForm) => this.httpClient.post(`${this.url}`, member, {
    headers: getHeadersWithToken()
  });

  public getMembers = () => this.httpClient.get<MemberModel[]>(`${this.url}`, {
    headers: getHeadersWithToken()
  });

  public getMember = (memberId: number) => this.httpClient.get<MemberModel>(`${this.url}/${memberId}`, {
    headers: getHeadersWithToken()
  });

  public updateMember = (memberId: number, memberForm: MemberForm) => this.httpClient.put<MemberModel>(`${this.url}/${memberId}`, memberForm, {
    headers: getHeadersWithToken()
  });

}
