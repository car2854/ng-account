import { Component, inject, OnInit, signal } from '@angular/core';
import { CardComponent } from "../../../../../shared/components/card-component/card.component";
import { TableComponentComponent, TableInterface } from "../../../../../shared/components/table-component/table-component.component";
import { AComponentComponent } from "../../../../../shared/components/a-component/a-component.component";
import { GetAccountsUseCase } from '../../../../../core/use-cases/account/get-accounts.usecase';
import { errorHelpers } from '../../../../helpers/errors-helper';
import { OptionsInterface } from '../../../../../shared/components/dropdown-button-component/dropdown-button-component.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],
  imports: [CardComponent, TableComponentComponent, AComponentComponent],
})
export class AccountsComponent implements OnInit {
  private router = inject(Router);
  private useCase = inject(GetAccountsUseCase);

  public table = signal<TableInterface>({
    headers: ['Id', 'Title', 'Description', 'Amount', 'CreatedAt'],
    body: []
  });
  public options : OptionsInterface[] = [
    {
      icon: 'Delete',
      description: 'See',
      onClick: (id) => {
        this.router.navigateByUrl(`/account-info/${id}`);
      },
    },
    {
      icon: 'Edit',
      description: 'Edit',
      onClick(id) {
        console.log(id);

      },
    }
  ]

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
            body: value.map((v) => [
              v.id,
              v.title,
              v.description,
              v.amount,
              v.createdAt,
            ]),
          };
        });
      },
    });
  }
}
