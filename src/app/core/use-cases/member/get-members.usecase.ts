import { MemberModel } from './../../models/member-model';
import { inject, Injectable } from "@angular/core";
import { MemberService } from "../../../infrastructure/services/member/member.service";
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GetMembersUseCase {
  private memberService = inject(MemberService);
  execute = (): Observable<MemberModel[]> => this.memberService.getMembers();
}
