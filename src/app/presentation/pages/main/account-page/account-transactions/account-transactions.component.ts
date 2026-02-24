import { TableComponent, TableInterface } from './../../../../../shared/components/table-component/table.component';
import { Component, inject, signal, ViewChild } from '@angular/core';
import { ModalHistoryComponent } from './component/modal-history/modal-history.component';
import { ActivatedRoute, Router } from '@angular/router';
import { GetAccountUseCase } from '../../../../../core/use-cases/account/get-account.usecase';
import { GetHistoriesUseCase } from '../../../../../core/use-cases/history/get-histories.usecase';
import { AccountModel } from '../../../../../core/models/account-model';
import { Status } from '../../../../enum/status-enum';
import { DropdownButtonComponentComponent, OptionsInterface } from '../../../../../shared/components/dropdown-button-component/dropdown-button-component.component';
import { generateHistoriesPdf } from './pdf/histories_pdf';
import { errorHelpers } from '../../../../helpers/errors-helper';
import { HttpErrorResponse } from '@angular/common/http';
import { safeParseInt } from '../../../../helpers/number-helper';
import { HistoryModel } from '../../../../../core/models/history-model';
import Decimal from 'decimal.js';
import { LoadingComponent } from "../../../../../shared/components/loading-component/loading.component";
import { CardComponent } from "../../../../../shared/components/card-component/card.component";
import { ButtonComponent } from "../../../../../shared/components/button-component/button.component";
import { AmountComponentComponent } from "../../../../../shared/components/amount-component/amount-component.component";
import { DateFormatPipe } from '../../../../pipe/date-format/date-format.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { AComponentComponent } from '../../../../../shared/components/a-component/a-component.component';

@Component({
  selector: 'app-account-transactions',
  imports: [
    CardComponent,
    DateFormatPipe,
    AmountComponentComponent,
    ButtonComponent,
    ReactiveFormsModule,
    ModalHistoryComponent,
    LoadingComponent,
    TableComponent,
    DropdownButtonComponentComponent,
    AComponentComponent
  ],
  templateUrl: './account-transactions.component.html',
  styleUrl: './account-transactions.component.css',
})
export class AccountTransactionsComponent {
  @ViewChild(ModalHistoryComponent) modal!: ModalHistoryComponent;
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private getAccountUseCase = inject(GetAccountUseCase);

  public account = signal<AccountModel | null>(null);
  public histories = signal<TableInterface>({
    headers: ['Id', 'Amount', 'Date', 'Description'],
    body: [],
  });

  public statusAccount = signal<Status>(Status.INITIAL);
  public options: OptionsInterface[] = [
    {
      description: 'Excel',
      icon: 'file-text',
      onClick: () => {},
    },
    {
      description: 'Pdf',
      icon: 'file-text',
      onClick: () => {
        generateHistoriesPdf({
          account: this.account()!,
          table: {
            headers: this.histories().headers.slice(1),
            body: this.histories().body.map((b) => b.slice(1)),
          },
        });
      },
    },
  ];

  constructor() {}

  private getAccount = (id: number) => {
    this.statusAccount.set(Status.LOADING);
    this.getAccountUseCase.execute(id).subscribe({
      error: (err: HttpErrorResponse) => {
        errorHelpers(err);
        this.statusAccount.set(Status.ERROR);
      },
      next: (value: AccountModel) => {
        console.log(value);
        this.statusAccount.set(Status.SUCCESS);
        this.account.set(value);

        this.histories.update((prev) => {
          return {
            headers: prev.headers,
            body: value.histories.map((v) => [v.id, v.amount, v.date, v.description]),
          };
        });
      },
    });
  };

  ngOnInit() {
    const id = safeParseInt(this.route.snapshot.paramMap.get('id'));
    if (id == null) {
      this.router.navigateByUrl('accounts');
      return;
    }

    this.getAccount(id);
  }

  public openModal = () => {
    this.modal.openModal();
  };

  public isLoading = () => this.statusAccount() == Status.LOADING;
  public onNewHistory = (newHistory: HistoryModel) => {
    this.histories.update((prev) => {
      return {
        headers: prev.headers,
        body: [...prev.body, [newHistory]],
      };
    });
    this.account.update((prev) => {
      if (!prev) return prev;
      const prevAmount = new Decimal(prev.amount);
      const newAmount = new Decimal(newHistory.amount);
      prev.amount = prevAmount.plus(newAmount);
      return prev;
    });
  };
}
