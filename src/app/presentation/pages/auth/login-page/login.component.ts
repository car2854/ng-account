import { Component, inject, OnInit, signal } from '@angular/core';
import { buildLoginForm } from './login.form';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FormInputComponent } from "../../../../shared/form-input-component/form-input.component";
import { CardComponent } from "../../../../shared/card-component/card.component";
import { ButtonComponent } from "../../../../shared/button-component/button.component";
import { RouterLink, Router } from '@angular/router';
import { LoginUseCase } from '../../../../core/use-cases/auth/login.usecase';
import { LoginForm } from '../../../../core/entities/login-form';
import { mapFormToDto } from '../../../helpers/map-from-to-dto';
import { Status } from '../../../enum/status-enum';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormInputComponent, CardComponent, ButtonComponent, RouterLink, ReactiveFormsModule],
})
export class LoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private loginUseCase = inject(LoginUseCase);
  public form = buildLoginForm(this.fb);

  public Status = Status;
  public status = signal<Status>(Status.INITIAL);

  constructor() {}

  ngOnInit() {}

  public login = () => {
    if (!this.form.invalid) {
      this.status.set(Status.LOADING);
      const dto = mapFormToDto<LoginForm>(this.form);
      this.loginUseCase.execute(dto).subscribe({
        error: (err: HttpErrorResponse) => {
          console.log(err.error);
          this.status.set(Status.ERROR);
        },
        next: (value) => {
          this.status.set(Status.SUCCESS);
          this.router.navigateByUrl('/dashboard');
        },
      });
    }
  };
}
