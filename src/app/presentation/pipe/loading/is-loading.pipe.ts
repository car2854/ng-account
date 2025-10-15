import { Pipe, PipeTransform } from '@angular/core';
import { Status } from '../../enum/status-enum';

@Pipe({
  name: 'isLoading'
})
export class IsLoadingPipe implements PipeTransform {
  transform(value: Status): boolean {
    return value === Status.LOADING;
  }
}
