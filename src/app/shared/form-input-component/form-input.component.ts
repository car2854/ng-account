import { Component, Input, OnInit } from '@angular/core';

type InputType = 'text' | 'password' | 'email'

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.css'],
})
export class FormInputComponent implements OnInit {
  @Input({ required: true }) label: string = '';
  @Input() type: InputType = 'text';
  @Input() placeholder: string = '';

  constructor() {}

  ngOnInit() {}
}
