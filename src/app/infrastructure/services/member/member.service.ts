import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { getHeadersWithToken } from '../../../presentation/helpers/get-token';
import { MemberForm } from '../../../core/entities/member-form';
import { MemberModel } from '../../../core/models/member-model';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private baseUrl = environment.apiUrl;
  private url = `${this.baseUrl}/member`;
  private httpClient = inject(HttpClient);

  createMember = (member: MemberForm) => this.httpClient.post(`${this.url}`, member, {
    headers: getHeadersWithToken()
  });

  getMembers = () => this.httpClient.get<MemberModel[]>(`${this.url}`, {
    headers: getHeadersWithToken()
  })

}
