import Decimal from "decimal.js";
import { HistoryModel } from "./history-model";
import { AccountModel } from "./account-model";
import { MemberModel } from "./member-model";

export class AccountMemberModel {
  constructor(
    public account: AccountModel,
    public amount: Decimal,
    public member: MemberModel
  ) {}
}
