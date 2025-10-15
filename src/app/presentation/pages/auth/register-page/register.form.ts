import { FormBuilder, Validators } from "@angular/forms";
import { FormBuilderControls } from "../../../type/form-builder-controls";
import { RegisterForm } from "../../../../core/entities/register-form";
import { inject, Injectable } from "@angular/core";
import { BaseFormBuilders } from "../../../../shared/form/base-form-builders";

@Injectable({ providedIn: 'root' })
export class RegisterFormBuilder extends BaseFormBuilders{
  build = () => {
    return this.fb.group<FormBuilderControls<RegisterForm>>({
      email: ['', [Validators.required]],
      name: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  };
}
