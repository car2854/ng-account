import { Component, OnInit } from '@angular/core';
import { CardComponent } from "../../../../../shared/card-component/card.component";
import { FormInputComponent } from "../../../../../shared/form-input-component/form-input.component";
import { ButtonComponent } from "../../../../../shared/button-component/button.component";

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
