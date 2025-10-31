import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

type FormatType = 'mediumDate';

@Pipe({
  name: 'dateFormat',
})
export class DateFormatPipe implements PipeTransform {
  private datePipe = new DatePipe('en-US');

  transform(date?: string | null, format: FormatType = 'mediumDate'): any {
    if (date == null) return '';
    try {
      return this.datePipe.transform(date, format);
    } catch {
      return '';
    }
  }
}
