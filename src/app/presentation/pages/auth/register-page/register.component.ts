import { Component, inject, OnInit, signal } from '@angular/core';
import { CardComponent } from "../../../../shared/components/card-component/card.component";
import { FormInputComponent } from "../../../../shared/components/form-input-component/form-input.component";
import { ButtonComponent } from "../../../../shared/components/button-component/button.component";
import { Router, RouterLink } from '@angular/router';
import { RegisterFormBuilder } from './register.form';
import { ReactiveFormsModule } from '@angular/forms';
import { Status } from '../../../enum/status-enum';
import { IsLoadingPipe } from '../../../pipe/loading/is-loading.pipe';
import { RegisterUseCase } from '../../../../core/use-cases/auth/register.usecase';
import { mapFormToDto } from '../../../helpers/map-from-to-dto';
import { RegisterForm } from '../../../../core/entities/register-form';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [CardComponent, FormInputComponent, ButtonComponent, RouterLink, ReactiveFormsModule, IsLoadingPipe],
})
export class RegisterComponent {
  private router = inject(Router);
  private registerFormBuilder = inject(RegisterFormBuilder);
  private registerUseCase = inject(RegisterUseCase);
  public form = this.registerFormBuilder.build();
  public status = signal<Status>(Status.INITIAL);

  public register = () => {
    if (this.form.invalid){
      return;
    }

    this.status.set(Status.LOADING);
    const dto = mapFormToDto<RegisterForm>(this.form);
    this.registerUseCase.execute(dto).subscribe({
      error: (err: HttpErrorResponse) => {
        this.status.set(Status.ERROR);
        console.log(err);
      },
      complete: () => {
        this.status.set(Status.SUCCESS);
        this.router.navigateByUrl('/dashboard');
      },
    });
  };
}
