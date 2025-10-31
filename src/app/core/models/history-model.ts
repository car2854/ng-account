import Decimal from "decimal.js";

export class HistoryModel {
  constructor(
    public id: number,
    public amount: Decimal,
    public description: number,
    public date: string,
    public createdAt: string,
    public deletedAt: string,
    public accountId: number
  ) {}
}
