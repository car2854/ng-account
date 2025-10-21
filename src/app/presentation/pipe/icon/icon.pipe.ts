// https://lucide.dev/icons/

import { Pipe, PipeTransform } from '@angular/core';
import * as Icons from 'lucide-angular';

@Pipe({
  name: 'icon',
})
export class IconPipe implements PipeTransform {
  transform(iconName: string): any {
    return (Icons as any)[iconName] || null;
  }
}
