import { MemberModel } from './../../models/member-model';
import { inject, Injectable } from "@angular/core";
import { AccountMemberService } from "../../../infrastructure/services/account-member/account-member";
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GetAccountMembersUseCase {
  private service = inject(AccountMemberService);
  public execute = (accountId: number): Observable<MemberModel[]> =>
    this.service.getAccountMembers(accountId);
}
