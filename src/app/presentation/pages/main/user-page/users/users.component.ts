import { TableInterface } from './../../../../../shared/components/table-component/table-component.component';
import { Component, inject, OnInit, signal } from '@angular/core';
import { CardComponent } from "../../../../../shared/components/card-component/card.component";
import { TableComponentComponent } from "../../../../../shared/components/table-component/table-component.component";
import { AComponentComponent } from "../../../../../shared/components/a-component/a-component.component";
import { GetMembersUseCase } from '../../../../../core/use-cases/member/get-members.usecase';
import { errorHelpers } from '../../../../helpers/errors-helper';
import { OptionsInterface } from '../../../../../shared/components/dropdown-button-component/dropdown-button-component.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  imports: [CardComponent, TableComponentComponent, AComponentComponent],
})
export class UsersComponent implements OnInit {
  private useCase = inject(GetMembersUseCase);
  private router = inject(Router);

  public table = signal<TableInterface>({
    headers: ['Id', 'Name', 'Created At'],
    body: [],
  });
  public options: OptionsInterface[] = [
    {
      icon: 'Delete',
      description: 'See',
      onClick:(id) => {
        this.router.navigateByUrl(`/user-info/${id}`);
      },
    },
    {
      icon: 'Edit',
      description: 'Edit',
      onClick: (id) => {
        this.router.navigateByUrl(`/user/${id}`);
      },
    },
  ];

  constructor() {}

  ngOnInit() {
    this.useCase.execute().subscribe({
      error: (err) => {
        errorHelpers(err);
      },
      next: (value) => {
        this.table.update((prev) => {
          return {
            headers: prev.headers,
            body: value.map((v) => [v.id, v.name, v.createdAt]),
          };
        });
      },
    });
  }
}
