import { inject, Injectable } from "@angular/core";
import { MemberService } from "../../../infrastructure/services/member/member.service";
import { MemberForm } from "../../entities/member-form";
import { Observable } from "rxjs";
import { MemberModel } from "../../models/member-model";

@Injectable({
  providedIn: 'root'
})
export class UpdateMemberUseCase {
  private service = inject(MemberService);
  public execute = (memberId: number, memberForm: MemberForm) : Observable<MemberModel> => this.service.updateMember(memberId, memberForm);
}
