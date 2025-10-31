import { generateHistoriesPdf } from './pdf/histories_pdf';
import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { safeParseInt } from '../../../../helpers/number-helper';
import { GetAccountUseCase } from '../../../../../core/use-cases/account/get-account.usecase';
import { errorHelpers } from '../../../../helpers/errors-helper';
import { AccountModel } from '../../../../../core/models/account-model';
import { CardComponent } from "../../../../../shared/components/card-component/card.component";
import { DateFormatPipe } from '../../../../pipe/date-format/date-format.pipe';
import { AmountComponentComponent } from "../../../../../shared/components/amount-component/amount-component.component";
import { ButtonComponent } from "../../../../../shared/components/button-component/button.component";
import { ReactiveFormsModule } from '@angular/forms';
import { ModalHistoryComponent } from "./component/modal-history/modal-history.component";
import { Status } from '../../../../enum/status-enum';
import { LoadingComponent } from "../../../../../shared/components/loading-component/loading.component";
import { GetHistoriesUseCase } from '../../../../../core/use-cases/history/get-histories.usecase';
import { HistoryModel } from '../../../../../core/models/history-model';
import { TableComponentComponent, TableInterface } from "../../../../../shared/components/table-component/table-component.component";
import { DropdownButtonComponentComponent, OptionsInterface } from "../../../../../shared/components/dropdown-button-component/dropdown-button-component.component";
import Decimal from 'decimal.js';
import { AComponentComponent } from "../../../../../shared/components/a-component/a-component.component";

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css'],
  imports: [
    CardComponent,
    DateFormatPipe,
    AmountComponentComponent,
    ButtonComponent,
    ReactiveFormsModule,
    ModalHistoryComponent,
    LoadingComponent,
    TableComponentComponent,
    DropdownButtonComponentComponent,
    AComponentComponent
],
})
export class AccountInfoComponent implements OnInit {
  @ViewChild(ModalHistoryComponent) modal!: ModalHistoryComponent;
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private getAccountUseCase = inject(GetAccountUseCase);
  private getHistoriesUseCase = inject(GetHistoriesUseCase);

  public account = signal<AccountModel | null>(null);
  public histories = signal<TableInterface>({
    headers: ['Id', 'Amount', 'Date', 'Description'],
    body: [],
  });

  public statusAccount = signal<Status>(Status.INITIAL);
  public statusHistory = signal<Status>(Status.INITIAL);
  public options: OptionsInterface[] = [
    {
      description: 'Excel',
      icon: 'file-text',
      onClick: () => {
      },
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
      error: (err) => {
        errorHelpers(err);
        this.statusAccount.set(Status.ERROR);
      },
      next: (value) => {
        this.statusAccount.set(Status.SUCCESS);
        this.account.set(value);
      },
    });
  };

  private getHistories = (id: number) => {
    this.statusHistory.set(Status.LOADING);
    this.getHistoriesUseCase.execute(id).subscribe({
      error: (err) => {
        errorHelpers(err);
        this.statusHistory.set(Status.ERROR);
      },
      next: (value) => {
        this.histories.update((prev) => {
          return {
            headers: prev.headers,
            body: value.map((v) => [v.id, v.amount, v.date, v.description]),
          };
        });
        this.statusHistory.set(Status.SUCCESS);
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
    this.getHistories(id);
  }

  public openModal = () => {
    this.modal.openModal();
  };

  public isLoading = () => this.statusAccount() == Status.LOADING;
  public onNewHistory = (newHistory: HistoryModel) => {
    this.histories.update((prev) => {
      return {
        headers: prev.headers,
        body: [...prev.body, newHistory],
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
