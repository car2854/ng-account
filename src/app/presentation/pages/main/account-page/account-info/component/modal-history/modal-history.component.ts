import { Component, inject, Input, OnInit, ViewChild } from '@angular/core';
import { ModalComponentComponent } from "../../../../../../../shared/components/modal-component/modal-component.component";
import { ButtonComponent } from "../../../../../../../shared/components/button-component/button.component";
import { FormInputComponent } from "../../../../../../../shared/components/form-input-component/form-input.component";
import { HistoryFormBuilder } from '../../history-form';
import { ɵInternalFormsSharedModule, ReactiveFormsModule } from "@angular/forms";
import { CreateHistoryUseCase } from '../../../../../../../core/use-cases/history/create-history.caseuse';
import { errorHelpers } from '../../../../../../helpers/errors-helper';
import { mapFormToDto } from '../../../../../../helpers/map-from-to-dto';
import { AccountForm } from '../../../../../../../core/entities/account-form';
import { HistoryForm } from '../../../../../../../core/entities/history-form';

@Component({
  selector: 'app-modal-history-component',
  templateUrl: './modal-history.component.html',
  styleUrls: ['./modal-history.component.css'],
  imports: [ModalComponentComponent, ButtonComponent, FormInputComponent, ɵInternalFormsSharedModule, ReactiveFormsModule],
})
export class ModalHistoryComponent implements OnInit {
  @ViewChild(ModalComponentComponent) modal!: ModalComponentComponent;
  @Input({required: true}) accountId!: number;
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
        accountId: this.accountId
      })
      .subscribe({
        error: (err) => {
          errorHelpers(err);
        },
        next: (value) => {},
      });

    this.modal.onCloseModal();
  };

  public openModal = () => {
    this.modal.onOpenModal();
  };
}
