import Decimal from "decimal.js";

export class HistoryModel {
  constructor(
    public id: number,
    public amount: Decimal,
    public description: number,
    public date: Date,
    public createdAt: Date,
    public deletedAt: Date,
    public accountId: number,
  ) {}
}
