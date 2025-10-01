import { Component, OnInit } from '@angular/core';
import { CardComponent } from "../../../../shared/card-component/card.component";
import { TableComponentComponent, TableInterface } from "../../../../shared/table-component/table-component.component";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  imports: [CardComponent, TableComponentComponent],
})
export class UsersComponent implements OnInit {
  public table: TableInterface = {
    headers: ['Name', 'Email', 'Password'],
    body: [
      [
        'Carlos',
        'carlos@gmail.com',
        '123123'
      ],
      [
        'Maria',
        'maria@gmail.com',
        '123123'
      ],
      [
        'Antonio',
        'antonio@gmail.com',
        '123123'
      ],
    ],
  };

  constructor() {}

  ngOnInit() {}
}
