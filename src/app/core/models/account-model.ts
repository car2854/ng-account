import Decimal from "decimal.js";
import { HistoryModel } from "./history-model";

export class AccountModel {
  constructor(
    public id :number,
    public title: string,
    public description: string,
    public amount: Decimal,
    public createdAt: Date,
  ) {}
}
