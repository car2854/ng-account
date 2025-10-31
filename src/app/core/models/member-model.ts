export class MemberModel {
  constructor(
    public id: number,
    public name: string,
    public createdAt: string,
    public referenceUserId: number
  ) {}
}
