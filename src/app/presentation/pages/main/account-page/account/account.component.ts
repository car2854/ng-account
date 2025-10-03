import { Component, OnInit } from '@angular/core';
import { CardComponent } from "../../../../../shared/card-component/card.component";
import { FormInputComponent } from "../../../../../shared/form-input-component/form-input.component";
import { ButtonComponent } from "../../../../../shared/button-component/button.component";
import { FormCheckboxComponent } from "../../../../../shared/form-checkbox-component/form-checkbox.component";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  imports: [CardComponent, FormInputComponent, ButtonComponent, FormCheckboxComponent],
})
export class AccountComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  public save = () => {

  }
}
