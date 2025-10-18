export class AccountModel {
  constructor(
    public id :number,
    public title: string,
    public description: string,
    public amount: number,
    public createdAt: Date,
  ) {}
}
