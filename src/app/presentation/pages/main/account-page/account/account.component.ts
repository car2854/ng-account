import { CreateAccountUseCase } from './../../../../../core/use-cases/account/create-account.usecase';
import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from "../../../../../shared/components/card-component/card.component";
import { FormInputComponent } from "../../../../../shared/components/form-input-component/form-input.component";
import { ButtonComponent } from "../../../../../shared/components/button-component/button.component";
import { FormCheckboxComponent } from "../../../../../shared/components/form-checkbox-component/form-checkbox.component";
import { AccountFormBuilder } from './account.form';
import { ReactiveFormsModule } from '@angular/forms';
import { errorHelpers } from '../../../../helpers/errors-helper';
import { mapFormToDto } from '../../../../helpers/map-from-to-dto';
import { AccountForm } from '../../../../../core/entities/account-form';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  imports: [CardComponent, FormInputComponent, ButtonComponent, FormCheckboxComponent, ReactiveFormsModule],
})
export class AccountComponent implements OnInit {
  private accountFB = inject(AccountFormBuilder);
  private useCase = inject(CreateAccountUseCase);
  public form = this.accountFB.build();

  constructor() {}

  ngOnInit() {}

  public save = () => {

    if (this.form.invalid) return;

    const dto = mapFormToDto<AccountForm>(this.form);

    this.useCase.execute(dto).subscribe({
      error: (err) => {
        errorHelpers(err);
      },
      next: (value) => {
        console.log(value);
      },
    });


  }
}
