import { OptionsInterface } from './../../../../../shared/components/dropdown-button-component/dropdown-button-component.component';
import { Component, inject, signal, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { safeParseInt } from '../../../../helpers/number-helper';
import { GetAccountUseCase } from '../../../../../core/use-cases/account/get-account.usecase';
import { errorHelpers } from '../../../../helpers/errors-helper';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountModel } from '../../../../../core/models/account-model';
import { MemberModel } from '../../../../../core/models/member-model';
import { GetMembersUseCase } from '../../../../../core/use-cases/member/get-members.usecase';
import { Status } from '../../../../enum/status-enum';
import { CardComponent } from "../../../../../shared/components/card-component/card.component";
import { IsLoadingPipe } from '../../../../pipe/loading/is-loading.pipe';
import { LoadingComponent } from "../../../../../shared/components/loading-component/loading.component";
import { ComboBoxInterface, ComboBoxComponent } from '../../../../../shared/components/combo-box-component/combo-box';
import { TableComponentComponent, TableInterface } from "../../../../../shared/components/table-component/table-component.component";
import { ModalComponentComponent } from "../../../../../shared/components/modal-component/modal-component.component";
import { ButtonComponent } from "../../../../../shared/components/button-component/button.component";
import { CreateAccountUseCase } from '../../../../../core/use-cases/account/create-account.usecase';
import { CreateAccountMemberUseCase } from '../../../../../core/use-cases/account-member/create-account-member';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css'],
  imports: [
    ReactiveFormsModule,
    CardComponent,
    IsLoadingPipe,
    LoadingComponent,
    ComboBoxComponent,
    TableComponentComponent,
  ],
})
export class AccountInfoComponent {
  private getAccountUseCase = inject(GetAccountUseCase);
  private getMembersUseCase = inject(GetMembersUseCase);
  private createAccountMember = inject(CreateAccountMemberUseCase);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  public account = signal<AccountModel | null>(null);
  public statusAccount = signal<Status>(Status.INITIAL);
  public statusCreateAccountMemeber = signal<Status>(Status.INITIAL);

  public membersOptions = signal<ComboBoxInterface[]>([]);
  public optionsMembers = signal<OptionsInterface[]>([
    {
      icon: '',
      description: 'Eliminar',
      onClick: (id) => {
        this.tableMembers.update((prev) => {
          return {
            headers: prev.headers,
            body: [...prev.body.filter((b) => b[0] != id).map((_) => _)],
          };
        });
      },
    },
  ]);
  public tableMembers = signal<TableInterface>({
    headers: ['Id', 'Name'],
    body: [],
  });

  private getAccount = (id: number) => {
    this.statusAccount.update((_) => Status.LOADING);
    this.getAccountUseCase.execute(id).subscribe({
      error: (err) => {
        errorHelpers(err);
        this.statusAccount.update((_) => Status.ERROR);
      },
      next: (value: AccountModel) => {
        this.account.update((_) => value);
        this.statusAccount.update((_) => Status.SUCCESS);
      },
    });
  };

  private getMembers = () => {
    this.getMembersUseCase.execute().subscribe({
      error: (err) => {
        errorHelpers(err);
      },
      next: (value) => {
        this.membersOptions.update((_) =>
          value.map((v) => {
            return {
              id: v.id,
              name: v.name,
            };
          })
        );
      },
    });
  };

  constructor() {}

  ngOnInit() {
    const id = safeParseInt(this.route.snapshot.paramMap.get('id'));
    if (id == null) {
      this.router.navigateByUrl('accounts');
      return;
    }

    this.getAccount(id);
    this.getMembers();
  }

  public onSelectedId = ({ id, name }: ComboBoxInterface) => {
    if (this.tableMembers().body.some((v) => v[0] == id)) {
      return;
    }

    this.statusCreateAccountMemeber.update((_) => Status.LOADING);

    this.createAccountMember.execute({
      accountId: this.account()!.id,
      amount: 0,
      memberId: id
    }).subscribe({
      error: (err) => {
        errorHelpers(err);
        this.statusCreateAccountMemeber.update((_) => Status.ERROR);
      },
      complete: () => {
        this.tableMembers.update((prev) => {
          return {
            headers: prev.headers,
            body: [...prev.body, [id, name]],
          };
        });
        this.statusCreateAccountMemeber.update((_) => Status.SUCCESS);
      },
    });
  };
}
