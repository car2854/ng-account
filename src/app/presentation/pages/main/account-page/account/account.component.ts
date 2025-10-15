import { Component, OnInit } from '@angular/core';
import { CardComponent } from "../../../../../shared/components/card-component/card.component";
import { FormInputComponent } from "../../../../../shared/components/form-input-component/form-input.component";
import { ButtonComponent } from "../../../../../shared/components/button-component/button.component";
import { FormCheckboxComponent } from "../../../../../shared/components/form-checkbox-component/form-checkbox.component";

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
