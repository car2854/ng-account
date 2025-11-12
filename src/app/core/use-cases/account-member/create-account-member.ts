import { HttpClient } from '@angular/common/http';
import { inject, Inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
@Injectable({ providedIn: 'root' })
class CreateAccountUseCase {
  private baseUrl = environment.apiUrl;
  private http = inject(HttpClient);
  private url = `${this.baseUrl}/account_member`;

  public createAccountMember = (accountId: number, memberId: number) => {
    // this.http.post();
  };
}
