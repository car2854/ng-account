import { Component, Input, OnInit } from '@angular/core';
import { LucideAngularModule } from "lucide-angular";
import { IconPipe } from '../../../presentation/pipe/icon/icon.pipe';

type TypeButton = 'button' | 'reset' | 'submit';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
  imports: [LucideAngularModule, IconPipe],
})
export class ButtonComponent implements OnInit {
  @Input() label: string = '';
  @Input() icon?: string;
  @Input() onClick: () => void = () => {};
  @Input() type: TypeButton = 'submit';
  @Input() disabled: boolean = false;

  constructor() {}

  ngOnInit() {}
}
