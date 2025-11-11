import { Component, Input } from '@angular/core';
import { FormInputComponent } from "../form-input-component/form-input.component";

export interface ComboBoxInterface {
  id: number,
  name: string
}

@Component({
  selector: 'app-combo-box-component',
  imports: [FormInputComponent],
  templateUrl: './combo-box.html',
  styleUrl: './combo-box.css',
})
export class ComboBoxComponent {
  @Input({ required: true }) options: ComboBoxInterface[] = [];
}
