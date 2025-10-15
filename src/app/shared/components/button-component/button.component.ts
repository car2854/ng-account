import { Component, Input, OnInit } from '@angular/core';

type TypeButton = 'button' | 'reset' | 'submit';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent implements OnInit {
  @Input({ required: true }) label: string = '';
  @Input() onClick: () => void = () => {};
  @Input() type: TypeButton = 'submit';

  constructor() {}

  ngOnInit() {}
}
