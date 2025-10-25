import { Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLinkActive, RouterStateSnapshot } from '@angular/router';
import { safeParseInt } from '../../../../helpers/number-helper';
import { GetAccountUseCase } from '../../../../../core/use-cases/account/get-account.usecase';
import { errorHelpers } from '../../../../helpers/errors-helper';
import { AccountModel } from '../../../../../core/models/account-model';
import { CardComponent } from "../../../../../shared/components/card-component/card.component";
import { FormInputComponent } from "../../../../../shared/components/form-input-component/form-input.component";
import { DateFormatPipe } from '../../../../pipe/date-format/date-format.pipe';
import { AccountComponent } from "../account/account.component";
import { AmountComponentComponent } from "../../../../../shared/components/amount-component/amount-component.component";
import { ButtonComponent } from "../../../../../shared/components/button-component/button.component";
import { View } from 'lucide-angular';
import { ModalComponentComponent } from "../../../../../shared/components/modal-component/modal-component.component";
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css'],
  imports: [
    CardComponent,
    DateFormatPipe,
    AmountComponentComponent,
    ButtonComponent,
    ModalComponentComponent,
    FormInputComponent,
    ReactiveFormsModule
],
})
export class AccountInfoComponent implements OnInit {
  @ViewChild(ModalComponentComponent) modal!: ModalComponentComponent;
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private usecase = inject(GetAccountUseCase);

  public account = signal<AccountModel | null>(null);

  constructor() {}

  ngOnInit() {
    const id = safeParseInt(this.route.snapshot.paramMap.get('id'));
    if (id == null) {
      this.router.navigateByUrl('accounts');
      return;
    }
    this.usecase.execute(id).subscribe({
      error: (err) => {
        errorHelpers(err);
      },
      next: (value) => {
        this.account.set(value);
      },
    });
  }

  public openModal = () => {
    this.modal.onOpenModal();
  };

  public save = () => {
    this.modal.onCloseModal();
  }
}
