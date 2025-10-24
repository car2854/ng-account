import { inject, Injectable } from "@angular/core"
import { MemberService } from "../../../infrastructure/services/member/member.service"
import { Observable } from "rxjs";
import { MemberModel } from "../../models/member-model";

@Injectable({providedIn: 'root'})
export class GetMemberUserCase {
  private memberService = inject(MemberService);

  execute = (memberId: number): Observable<MemberModel> => this.memberService.getMember(memberId);
}
