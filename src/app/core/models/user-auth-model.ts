import { UserModel } from "./user-model";

export class UserAuthModel extends UserModel{
  constructor(
    public token: string,
    ...args: ConstructorParameters<typeof UserModel>
  ) {
    super(...args);
  }
}
