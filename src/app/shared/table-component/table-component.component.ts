import { Component, Input, OnInit } from '@angular/core';

export interface TableInterface{
  headers: string[]
  body: any[],
}

@Component({
  selector: 'app-table',
  templateUrl: './table-component.component.html',
  styleUrls: ['./table-component.component.css']
})
export class TableComponentComponent implements OnInit {

  @Input({required: true}) table: TableInterface = {
    headers: [],
    body: [],
  }

  constructor() { }

  ngOnInit() {
  }

}
