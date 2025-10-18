import { Component, inject, OnInit, signal } from '@angular/core';
import { CardComponent } from "../../../../../shared/components/card-component/card.component";
import { TableComponentComponent, TableInterface } from "../../../../../shared/components/table-component/table-component.component";
import { AComponentComponent } from "../../../../../shared/components/a-component/a-component.component";
import { GetAccountUseCase } from '../../../../../core/use-cases/account/get-account.usecase';
import { errorHelpers } from '../../../../helpers/errors-helper';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],
  imports: [CardComponent, TableComponentComponent, AComponentComponent],
})
export class AccountsComponent implements OnInit {
  private useCase = inject(GetAccountUseCase);

  public table = signal<TableInterface>({
    headers: ['Id', 'Title', 'Description', 'Amount', 'CreatedAt'],
    body: []
  });

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
              v.createdAt
            ]),
          };
        });
      },
    });
  }
}
