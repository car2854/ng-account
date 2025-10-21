import { TableInterface } from './../../../../../shared/components/table-component/table-component.component';
import { Component, inject, OnInit, signal } from '@angular/core';
import { CardComponent } from "../../../../../shared/components/card-component/card.component";
import { TableComponentComponent } from "../../../../../shared/components/table-component/table-component.component";
import { ButtonComponent } from "../../../../../shared/components/button-component/button.component";
import { AComponentComponent } from "../../../../../shared/components/a-component/a-component.component";
import { GetMembersUseCase } from '../../../../../core/use-cases/member/get-members.usecase';
import { errorHelpers } from '../../../../helpers/errors-helper';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  imports: [CardComponent, TableComponentComponent, AComponentComponent],
})
export class UsersComponent implements OnInit {

  private useCase = inject(GetMembersUseCase);

  public table = signal<TableInterface>(
    {
      headers: ['Id', 'Name', 'Created At'],
      body: [],
    }
  );

  constructor() {}

  ngOnInit() {

    this.useCase.execute().subscribe({
      error: (err) => {
        errorHelpers(err);
      },
      next: (value) => {
        this.table.update(prev => {
          return {
            headers: prev.headers,
            body: value.map((v) => [
              v.id,
              v.name,
              v.createdAt
            ])
          }
        })
      },
    });

  }
}
