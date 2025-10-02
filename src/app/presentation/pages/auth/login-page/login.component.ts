import { Component, inject, OnInit } from '@angular/core';
import { buildLoginForm } from './login.form';
import { FormBuilder } from '@angular/forms';
import { FormInputComponent } from "../../../../shared/form-input-component/form-input.component";
import { CardComponent } from "../../../../shared/card-component/card.component";
import { ButtonComponent } from "../../../../shared/button-component/button.component";
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormInputComponent, CardComponent, ButtonComponent, RouterLink]
})
export class LoginComponent implements OnInit {

  private fb = inject(FormBuilder);
  private router = inject(Router);

  public form = buildLoginForm(this.fb);

  constructor() { }

  ngOnInit() {
  }

  public login = () => {
    this.router.navigateByUrl('/dashboard');
  }

}
