import { Component, inject, OnInit, signal } from '@angular/core';
import { CardComponent } from "../../../../../shared/components/card-component/card.component";
import { FormInputComponent } from "../../../../../shared/components/form-input-component/form-input.component";
import { ButtonComponent } from "../../../../../shared/components/button-component/button.component";
import { UserFormBuilder } from './user.form';
import { ReactiveFormsModule } from '@angular/forms';
import { mapFormToDto } from '../../../../helpers/map-from-to-dto-helper';
import { MemberForm } from '../../../../../core/entities/member-form';
import { CreateMemberUseCase } from '../../../../../core/use-cases/member/create-member.usecase';
import { errorHelpers } from '../../../../helpers/errors-helper';
import { Status } from '../../../../enum/status-enum';
import { IsLoadingPipe } from '../../../../pipe/loading/is-loading.pipe';
import { safeParseInt } from '../../../../helpers/number-helper';
import { ActivatedRoute } from '@angular/router';
import { GetMemberUserCase } from '../../../../../core/use-cases/member/get-member.usecase';
import { UpdateMemberUseCase } from '../../../../../core/use-cases/member/update-member.usecase';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  imports: [
    CardComponent,
    FormInputComponent,
    ButtonComponent,
    ReactiveFormsModule,
    IsLoadingPipe
  ],
})
export class UserComponent implements OnInit {
  private userFB = inject(UserFormBuilder);
  private createUseCase = inject(CreateMemberUseCase);
  private updateUseCase = inject(UpdateMemberUseCase);
  private getUseCase = inject(GetMemberUserCase);

  public route = inject(ActivatedRoute);
  public form = this.userFB.build();

  public status = signal<Status>(Status.INITIAL);
  public memberId: number = 0;

  constructor() {}

  ngOnInit() {

    const memberId = safeParseInt(this.route.snapshot.paramMap.get('id'));
    if (memberId != null) {
      this.getUseCase.execute(memberId).subscribe({
        next: (value) => {
          this.memberId = value.id;
          this.form.setValue({
            name: value.name
          });
        },
        error: (err) => {
          errorHelpers(err);
        },
      })
    }

  }

  public save = () => {
    if (this.form.invalid) {
      return;
    }
    const dto = mapFormToDto<MemberForm>(this.form);
    this.status.update(_ => Status.LOADING);

    if (this.memberId == 0){
      this.createUseCase.execute(dto).subscribe({
        error: (err) => {
          errorHelpers(err);
          this.status.update((_) => Status.ERROR);
        },
        next: (value) => {
          this.status.update((_) => Status.SUCCESS);
        },
      });
    }else{
      this.updateUseCase.execute(this.memberId, dto).subscribe({
        error: (err) => {
          errorHelpers(err);
          this.status.update((_) => Status.ERROR);
        },
        next: (value) => {
          this.status.update((_) => Status.SUCCESS);
        },
      });
    }

  };
}
