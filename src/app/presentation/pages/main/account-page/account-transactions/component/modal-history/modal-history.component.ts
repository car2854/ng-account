import { OptionsInterface } from './../../../../../../../shared/components/dropdown-button-component/dropdown-button-component.component';
import { TableComponent, TableInterface } from './../../../../../../../shared/components/table-component/table.component';
import { ComboBoxInterface } from './../../../../../../../shared/components/combo-box-component/combo-box';
import { Component, EventEmitter, inject, Input, OnInit, Output, ViewChild, signal } from '@angular/core';
import { ButtonComponent } from "../../../../../../../shared/components/button-component/button.component";
import { FormInputComponent } from "../../../../../../../shared/components/form-input-component/form-input.component";
import { ɵInternalFormsSharedModule, ReactiveFormsModule } from "@angular/forms";
import { CreateHistoryUseCase } from '../../../../../../../core/use-cases/history/create-history.usecase';
import { errorHelpers } from '../../../../../../helpers/errors-helper';
import { mapFormToDto } from '../../../../../../helpers/map-from-to-dto-helper';
import { AccountForm } from '../../../../../../../core/entities/account-form';
import { HistoryForm } from '../../../../../../../core/entities/history-form';
import { HistoryModel } from '../../../../../../../core/models/history-model';
import { HistoryFormBuilder } from '../../../account-info/history-form';
import { HorizontalModalComponentComponent } from '../../../../../../../shared/components/horizontal-modal-component/horizontal-modal.component';
import { ComboBoxComponent } from "../../../../../../../shared/components/combo-box-component/combo-box";
import { AccountMemberModel } from '../../../../../../../core/models/account-member';
import { id } from '@swimlane/ngx-charts';
import { MemberForm } from '../../../../../../../core/entities/member-form';

@Component({
  selector: 'app-modal-history-component',
  templateUrl: './modal-history.component.html',
  styleUrls: ['./modal-history.component.css'],
  imports: [
    HorizontalModalComponentComponent,
    ButtonComponent,
    FormInputComponent,
    ɵInternalFormsSharedModule,
    ReactiveFormsModule,
    ComboBoxComponent,
    TableComponent,
  ],
})
export class ModalHistoryComponent implements OnInit {
  @ViewChild(HorizontalModalComponentComponent) modal!: HorizontalModalComponentComponent;
  @Input({ required: true }) accountId!: number;
  @Input({ required: true }) members?: AccountMemberModel[] = [];
  @Output() onNewHistory = new EventEmitter<HistoryModel>();
  private historyFB = inject(HistoryFormBuilder);
  private useCase = inject(CreateHistoryUseCase);
  public form = this.historyFB.build();

  public options: OptionsInterface[] = [
    {
      icon: 'Remove',
      description: 'Remove',
      onClick: (id) => {
        this.table.update((prev) => {
          return {
            headers: this.table().headers,
            body: this.table().body.filter((b) => b[0] != id),
          };
        });
      },
    },
  ];
  public table = signal<TableInterface>({
    headers: ['Id', 'Name'],
    body: [],
  });

  constructor() {}

  ngOnInit() {}

  public save = () => {
    if (this.form.invalid) return;
    const dto = mapFormToDto<Omit<HistoryForm, 'accountId' | 'members'>>(this.form);
    this.useCase
      .execute({
        ...dto,
        amount: Number(dto.amount),
        accountId: this.accountId,
        members: this.table().body.map((t) => {
          return {
            id: t[0],
            name: t[1],
          } as MemberForm;
        }),
      })
      .subscribe({
        error: (err) => {
          errorHelpers(err);
        },
        next: (value) => {
          this.onNewHistory.emit(value);
          this.modal.onCloseModal();
        },
      });
  };

  public openModal = () => {
    this.modal.onOpenModal();
  };

  public getComboBoxComponent = (): ComboBoxInterface[] => {
    const data = this.members?.map((m) => {
      return {
        id: m.member.id,
        name: m.member.name,
      };
    }) ?? [];

    return [{
      id: 0,
      name: 'Todos'
    }, ...data];
  };

  public onSelectedMemberId = ({ id, name }: ComboBoxInterface) => {
    if (this.table().body.some((b) => b[0] == id)) return;
    if (id == 0){
      this.table.update((prev) => {
        return {
          headers: prev.headers,
          body: this.members?.map((m) => {
            return [
              m.member.id,
              m.member.name
            ]
          }) ?? []
        }
      })
      return;
    }
    this.table.update((prev) => {
      return {
        headers: prev.headers,
        body: [...prev.body, [id, name]],
      };
    });
  };
}
