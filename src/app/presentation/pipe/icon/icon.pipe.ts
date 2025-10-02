import { Pipe, PipeTransform } from '@angular/core';
// import { BookMinusIcon, HouseIcon, LogInIcon, LogOutIcon, SettingsIcon, UsersIcon } from 'lucide-angular';
import * as Icons from 'lucide-angular';

@Pipe({
  name: 'icon',
})
export class IconPipe implements PipeTransform {
  transform(iconName: string): any {
    return (Icons as any)[iconName] || null;
  }
}
