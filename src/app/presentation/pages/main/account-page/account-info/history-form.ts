import { Injectable } from "@angular/core";
import { BaseFormBuilders } from "../../../../../shared/form/base-form-builders";
import { FormGroup, Validators } from "@angular/forms";
import { FormBuilderControls } from "../../../../type/form-builder-controls";
import { HistoryForm } from "../../../../../core/entities/history-form";

@Injectable({
  providedIn: 'root'
})
export class HistoryFormBuilder extends BaseFormBuilders{
  override build(): FormGroup {
    return this.fb.group<FormBuilderControls<Omit<HistoryForm, 'accountId' | 'members'>>>({
      amount: [0, [Validators.required]],
      date: [new Date(), Validators.required],
      description: ['', Validators.required],
    });
  }
}
