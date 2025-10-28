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
  ],
})
export class AccountInfoComponent implements OnInit {
  @ViewChild(ModalHistoryComponent) modal!: ModalHistoryComponent;
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private getAccountUseCase = inject(GetAccountUseCase);
  private getHistoriesUseCase = inject(GetHistoriesUseCase);

  public account = signal<AccountModel | null>(null);
  public status = signal<Status>(Status.INITIAL);

  constructor() {}

  private getAccount = (id: number) => {
    this.status.set(Status.LOADING);
    this.getAccountUseCase.execute(id).subscribe({
      error: (err) => {
        errorHelpers(err);
        this.status.set(Status.ERROR);
      },
      next: (value) => {
        this.status.set(Status.SUCCESS);
        this.account.set(value);
      },
    });
  }

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

  public isLoading = () => this.status() == Status.LOADING;
}
