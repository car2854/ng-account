import { Component, Input, OnInit, signal } from '@angular/core';
import { XIcon, LucideAngularModule } from 'lucide-angular';
import { DropdownButtonComponentComponent, OptionsInterface } from "../dropdown-button-component/dropdown-button-component.component";

export interface TableInterface {
  headers: string[];
  body: unknown[][];
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  imports: [LucideAngularModule, DropdownButtonComponentComponent],
})
export class TableComponent implements OnInit {
  readonly XIcon = XIcon;
  @Input() messageEmpty: string = 'No hay datos para mostrar';
  @Input() options: OptionsInterface[] = [];
  @Input({ required: false }) table: TableInterface = {
    headers: [],
    body: [] as unknown[][],
  };

  constructor() {}

  ngOnInit() {}

  public getHeader = () => (this.table.headers.length == 0 ? [] : this.table.headers.slice(1));
  public getBody = () =>
    this.table.body.length == 0 ? [] : this.table.body.map((m) => m.slice(1));
  public getId = (data: unknown[]): number => {
    if (typeof data[0] === 'number') return data[0];
    else return 0;
  };
}
