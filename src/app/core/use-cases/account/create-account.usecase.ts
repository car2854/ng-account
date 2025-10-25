import { AccountForm } from '../../entities/account-form';
import { inject, Injectable } from "@angular/core";
import { AccountService } from "../../../infrastructure/services/account/account.service";
import { AccountModel } from '../../models/account-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreateAccountUseCase{
  private accountService = inject(AccountService);
  public execute = (accountForm: AccountForm): Observable<AccountModel> =>
    this.accountService.createAccount(accountForm);
}
