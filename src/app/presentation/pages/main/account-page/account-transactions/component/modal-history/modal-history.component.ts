import { Component, EventEmitter, inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalComponentComponent } from "../../../../../../../shared/components/modal-component/modal-component.component";
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

@Component({
  selector: 'app-modal-history-component',
  templateUrl: './modal-history.component.html',
  styleUrls: ['./modal-history.component.css'],
  imports: [ModalComponentComponent, ButtonComponent, FormInputComponent, ɵInternalFormsSharedModule, ReactiveFormsModule],
})
export class ModalHistoryComponent implements OnInit {
  @ViewChild(ModalComponentComponent) modal!: ModalComponentComponent;
  @Input({required: true}) accountId!: number;
  @Output() onNewHistory = new EventEmitter<HistoryModel>();
  private historyFB = inject(HistoryFormBuilder);
  private useCase = inject(CreateHistoryUseCase);
  public form = this.historyFB.build();

  constructor() {}

  ngOnInit() {}

  public save = () => {

    if (this.form.invalid) return;
    const dto = mapFormToDto<Omit<HistoryForm, 'accountId'>>(this.form);
    this.useCase
      .execute({
        ...dto,
        amount: Number(dto.amount),
        accountId: this.accountId,
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
}
