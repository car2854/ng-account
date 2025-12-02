import { inject, Injectable } from '@angular/core';
import { AccountMemberService } from '../../../infrastructure/services/account-member/account-member';
import { AccountMemberForm } from '../../entities/account-member-form';
@Injectable({ providedIn: 'root' })
export class CreateAccountMemberUseCase {
  private service = inject(AccountMemberService);
  public execute = (accountMemberForm: AccountMemberForm) =>
    this.service.createAccountMember(accountMemberForm);
}
