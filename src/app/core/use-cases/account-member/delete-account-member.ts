import { inject, Injectable } from "@angular/core";
import { AccountMemberService } from "../../../infrastructure/services/account-member/account-member";

@Injectable({providedIn: 'root'})
export class DeleteAccountMemberUseCase{
  private service = inject(AccountMemberService);
  public execute = (accountId: number, memberId: number) => this.service.deleteAccountMembers(accountId, memberId);
}
