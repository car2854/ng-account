import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-checkbox',
  templateUrl: './form-checkbox.component.html',
  styleUrls: ['./form-checkbox.component.css']
})
export class FormCheckboxComponent implements OnInit {

  @Input({required: true}) label = '';

  constructor() { }

  ngOnInit() {
  }

}
