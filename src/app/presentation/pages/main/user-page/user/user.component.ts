import { Component, OnInit } from '@angular/core';
import { CardComponent } from "../../../../../shared/components/card-component/card.component";
import { FormInputComponent } from "../../../../../shared/components/form-input-component/form-input.component";
import { ButtonComponent } from "../../../../../shared/components/button-component/button.component";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  imports: [CardComponent, FormInputComponent, ButtonComponent],
})
export class UserComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  public save = () => {

  }
}
