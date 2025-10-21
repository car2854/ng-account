import { Component, Input, OnInit, signal } from '@angular/core';
import { XIcon, LucideAngularModule } from 'lucide-angular';
import { DropdownButtonComponentComponent, OptionsInterface } from "../dropdown-button-component/dropdown-button-component.component";

export interface TableInterface{
  headers: string[]
  body: any[],
}

@Component({
  selector: 'app-table',
  templateUrl: './table-component.component.html',
  styleUrls: ['./table-component.component.css'],
  imports: [LucideAngularModule, DropdownButtonComponentComponent],
})
export class TableComponentComponent implements OnInit {
  readonly XIcon = XIcon;
  @Input() options : OptionsInterface[] = [];
  @Input({ required: false }) table = signal<TableInterface>({
    headers: [],
    body: [],
  });

  constructor() {}

  ngOnInit() {}

  getHeader = () => (this.table().headers.length == 0 ? [] : this.table().headers.slice(1));
  getBody = () => (this.table().body.length == 0 ? [] : this.table().body.map((m) => m.slice(1)));
}
