import { MemberForm } from "./member-form";

export interface HistoryForm {
  amount: number,
  description: string,
  date: Date,
  accountId: number,
  members: MemberForm[]
}
