import { Pipe, PipeTransform } from '@angular/core';
import { Decimal } from 'decimal.js';

@Pipe({
  name: 'numberMaskFormat',
})
export class NumberMaskFormatPipe implements PipeTransform {
  transform(value?: Decimal, args?: any): any {
    if (value == null){
      return '0.00 Bs.'
    }
    return `${value.toString()} Bs.`;
  }
}
