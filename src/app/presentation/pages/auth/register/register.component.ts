import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from "../../../../shared/card-component/card.component";
import { FormInputComponent } from "../../../../shared/form-input-component/form-input.component";
import { ButtonComponent } from "../../../../shared/button-component/button.component";
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [CardComponent, FormInputComponent, ButtonComponent, RouterLink]
})
export class RegisterComponent implements OnInit {

  private router = inject(Router);

  constructor(
  ) { }

  ngOnInit() {
  }

  public register = () => {

    this.router.navigateByUrl('/dashboard');

  }

}
