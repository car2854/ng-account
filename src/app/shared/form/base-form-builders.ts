import { inject } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { FormBuilderControls } from "../../presentation/type/form-builder-controls";

export abstract class BaseFormBuilders {
  public fb = inject(FormBuilder);
  abstract build(): FormGroup;
}
