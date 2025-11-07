import { inject, Injectable } from "@angular/core"
import { MemberService } from "../../../infrastructure/services/member/member.service"
import { MemberForm } from "../../entities/member-form";
import { Observable } from "rxjs";
import { MemberModel } from "../../models/member-model";

@Injectable({providedIn: 'root'})
export class CreateMemberUseCase {
  private service = inject(MemberService);
  public execute = (member: MemberForm) : Observable<MemberModel> => this.service.createMember(member);
}
