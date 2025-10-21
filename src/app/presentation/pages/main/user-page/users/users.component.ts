import { Component, OnInit, signal } from '@angular/core';
import { CardComponent } from "../../../../../shared/components/card-component/card.component";
import { TableComponentComponent, TableInterface } from "../../../../../shared/components/table-component/table-component.component";
import { ButtonComponent } from "../../../../../shared/components/button-component/button.component";
import { AComponentComponent } from "../../../../../shared/components/a-component/a-component.component";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  imports: [CardComponent, TableComponentComponent, AComponentComponent],
})
export class UsersComponent implements OnInit {
  public table = signal<TableInterface>(
    {
      headers: ['Name', 'Email', 'Password'],
      body: [
        ['Carlos', 'carlos@gmail.com', '123123'],
        ['Maria', 'maria@gmail.com', '123123'],
        ['Antonio', 'antonio@gmail.com', '123123'],
      ],
    }
  );

  constructor() {}

  ngOnInit() {}
}
