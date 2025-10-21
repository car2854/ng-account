import { inject, Injectable } from "@angular/core"
import { MemberService } from "../../../infrastructure/services/member/member.service"
import { MemberForm } from "../../entities/member-form";

@Injectable({providedIn: 'root'})
export class CreateMemberUseCase {
  private service = inject(MemberService);
  execute = (member: MemberForm) => this.service.createMember(member);
}
