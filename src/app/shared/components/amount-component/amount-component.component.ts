import { Component, Input, OnInit } from '@angular/core';
import { NumberMaskFormatPipe } from '../../../presentation/pipe/number-mask-format/number-mask-format.pipe';
import { Decimal } from 'decimal.js';

@Component({
  selector: 'app-amount-component',
  templateUrl: './amount-component.component.html',
  styleUrls: ['./amount-component.component.css'],
  imports: [NumberMaskFormatPipe],
})
export class AmountComponentComponent implements OnInit {
  @Input() amount?: Decimal = Decimal('0.0');

  constructor() {}

  ngOnInit() {}
}
