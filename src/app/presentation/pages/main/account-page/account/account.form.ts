import { Injectable } from "@angular/core";
import { BaseFormBuilders } from "../../../../../shared/form/base-form-builders";
import { FormGroup, Validators } from "@angular/forms";
import { AccountForm } from "../../../../../core/entities/account-form";
import { FormBuilderControls } from "../../../../type/form-builder-controls";

@Injectable({providedIn: 'root'})
export class AccountFormBuilder extends BaseFormBuilders{
  override build(): FormGroup {
    return this.fb.group<FormBuilderControls<AccountForm>>({
      description: ['', [Validators.required]],
      initialAmount: [0, [Validators.required]],
      isActive: [false, [Validators.required]],
      title: ['', [Validators.required]]
    });
  }
}
