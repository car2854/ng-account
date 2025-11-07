import { GetMembersUseCase } from './../../../../../core/use-cases/member/get-members.usecase';
import { CreateAccountUseCase } from './../../../../../core/use-cases/account/create-account.usecase';
import { Component, inject, OnInit, signal } from '@angular/core';
import { CardComponent } from "../../../../../shared/components/card-component/card.component";
import { FormInputComponent } from "../../../../../shared/components/form-input-component/form-input.component";
import { ButtonComponent } from "../../../../../shared/components/button-component/button.component";
import { FormCheckboxComponent } from "../../../../../shared/components/form-checkbox-component/form-checkbox.component";
import { AccountFormBuilder } from './account.form';
import { ReactiveFormsModule } from '@angular/forms';
import { errorHelpers } from '../../../../helpers/errors-helper';
import { mapFormToDto } from '../../../../helpers/map-from-to-dto-helper';
import { AccountForm } from '../../../../../core/entities/account-form';
import { GetAccountUseCase } from '../../../../../core/use-cases/account/get-account.usecase';
import { ActivatedRoute } from '@angular/router';
import { safeParseInt } from '../../../../helpers/number-helper';
import { GetMemberUserCase } from '../../../../../core/use-cases/member/get-member.usecase';
import { MemberModel } from '../../../../../core/models/member-model';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  imports: [
    CardComponent,
    FormInputComponent,
    ButtonComponent,
    FormCheckboxComponent,
    ReactiveFormsModule,
  ],
})
export class AccountComponent implements OnInit {
  private accountFB = inject(AccountFormBuilder);
  private createUseCase = inject(CreateAccountUseCase);
  private getUseCase = inject(GetAccountUseCase);
  private getMembersUseCase = inject(GetMembersUseCase)
  private route = inject(ActivatedRoute);
  public form = this.accountFB.build();

  public members = signal<MemberModel[]>([]);

  public accountId = signal(0);

  constructor() {}

  private getMembers = () => {
    this.getMembersUseCase.execute().subscribe({
      error: (err) => {
        errorHelpers(err);
      },
      next: (value) => {
        this.members.update(_ => value);
      },
    });
  }

  private getAccount = (id: number) => {
    this.getUseCase.execute(id).subscribe({
      error: (err) => {
        errorHelpers(err);
      },
      next: (value) => {
        this.accountId.update((_) => value.id);
        this.form.setValue({
          description: value.description,
          title: value.title,
          isActive: value.isActive,
          initialAmount: value.amount,
        });
      },
    });
  }

  ngOnInit() {
    const id = safeParseInt(this.route.snapshot.paramMap.get('id'));
    if (id != null) {
      this.getAccount(id);
    }
    this.getMembers();
  }

  public save = () => {
    if (this.form.invalid) return;

    const dto = mapFormToDto<AccountForm>(this.form);

    if (this.accountId() == 0){
      this.createUseCase.execute(dto).subscribe({
        error: (err) => {
          errorHelpers(err);
        },
        next: (value) => {
          console.log(value);
        },
      });
    } else {

    }

  };
}
