import { FormGroup, Validators } from "@angular/forms";
import { BaseFormBuilders } from "../../../../../shared/form/base-form-builders";
import { FormBuilderControls } from "../../../../type/form-builder-controls";
import { MemberForm } from "../../../../../core/entities/member-form";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class UserFormBuilder extends BaseFormBuilders{
  override build(): FormGroup {
    return this.fb.group<FormBuilderControls<MemberForm>>({
      name: ['', [Validators.required]]
    });
  }

}
