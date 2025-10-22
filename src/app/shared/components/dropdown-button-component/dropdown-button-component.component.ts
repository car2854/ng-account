import { Component, ElementRef, HostListener, inject, Input, OnInit, signal } from '@angular/core';
import { ButtonComponent } from "../button-component/button.component";
import { LucideAngularModule } from "lucide-angular";
import { IconPipe } from '../../../presentation/pipe/icon/icon.pipe';

export interface OptionsInterface {
  icon: string;
  description: string;
  onClick: (id: number) => void;
}

@Component({
  selector: 'app-dropdown-button-component',
  templateUrl: './dropdown-button-component.component.html',
  styleUrls: ['./dropdown-button-component.component.css'],
  imports: [LucideAngularModule, IconPipe],
})
export class DropdownButtonComponentComponent implements OnInit {
  @Input() label: string = '';
  @Input() icon?: string;
  @Input() id: number = 0;
  @Input({required: true}) options!: OptionsInterface[];
  private eRef = inject(ElementRef);
  public isVisible = signal(false);

  constructor() {}

  ngOnInit() {}

  @HostListener('document:click', ['$event'])
  handleClickOutside = (event: MouseEvent) => {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isVisible.set(false);
    }
  };

  public clickDropdown = () => {
    this.isVisible.update((prev) => !prev);
  };
}
