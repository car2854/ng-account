import { Component, inject, OnInit, signal } from '@angular/core';
import { CardComponent } from "../../../../../shared/components/card-component/card.component";
import { FormInputComponent } from "../../../../../shared/components/form-input-component/form-input.component";
import { GetMemberUserCase } from '../../../../../core/use-cases/member/get-member.usecase';
import { ActivatedRoute, Router } from '@angular/router';
import { safeParseInt } from '../../../../helpers/number-helper';
import { errorHelpers } from '../../../../helpers/errors-helper';
import { MemberModel } from '../../../../../core/models/member-model';
import { DatePipe } from '@angular/common';
import { DateFormatPipe } from '../../../../pipe/date-format/date-format.pipe';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
  imports: [CardComponent, FormInputComponent, DateFormatPipe],
})
export class UserInfoComponent implements OnInit {
  private usecase = inject(GetMemberUserCase);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  public member = signal<MemberModel | null>(null);

  constructor() {}

  ngOnInit() {
    const memberId = safeParseInt(this.route.snapshot.paramMap.get('id'));
    if (memberId == null) {
      this.router.navigateByUrl('/users');
      return;
    }

    this.usecase.execute(memberId).subscribe({
      error: (err) => {
        errorHelpers(err);
      },
      next: (value: MemberModel) => {
        this.member.set(value);
      },
    });
  }
}
