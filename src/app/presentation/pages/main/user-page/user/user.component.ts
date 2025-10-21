import { Component, inject, OnInit, signal } from '@angular/core';
import { CardComponent } from "../../../../../shared/components/card-component/card.component";
import { FormInputComponent } from "../../../../../shared/components/form-input-component/form-input.component";
import { ButtonComponent } from "../../../../../shared/components/button-component/button.component";
import { UserFormBuilder } from './user.form';
import { ReactiveFormsModule } from '@angular/forms';
import { mapFormToDto } from '../../../../helpers/map-from-to-dto';
import { MemberForm } from '../../../../../core/entities/member-form';
import { CreateMemberUseCase } from '../../../../../core/use-cases/member/create-member.usecase';
import { errorHelpers } from '../../../../helpers/errors-helper';
import { Status } from '../../../../enum/status-enum';
import { IsLoadingPipe } from '../../../../pipe/loading/is-loading.pipe';

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
  private useCase = inject(CreateMemberUseCase);
  public form = this.userFB.build();

  public status = signal<Status>(Status.INITIAL);

  constructor() {}

  ngOnInit() {}

  public save = () => {
    if (this.form.invalid) {
      return;
    }
    const dto = mapFormToDto<MemberForm>(this.form);
    this.status.update(_ => Status.LOADING);
    this.useCase.execute(dto).subscribe({
      error: (err) => {
        errorHelpers(err);
        this.status.update(_ => Status.ERROR);
      },
      next: (value) => {
        this.status.update(_ => Status.SUCCESS);
      },
    })
  };
}
