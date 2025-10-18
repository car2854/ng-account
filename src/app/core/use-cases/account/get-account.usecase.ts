import { inject, Injectable } from "@angular/core";
import { AccountService } from "../../../infrastructure/services/account/account.service";
import { AccountModel } from "../../models/account-model";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class GetAccountUseCase {
  private accountService = inject(AccountService);
  execute = (): Observable<AccountModel[]> => this.accountService.getAccounts();
}
