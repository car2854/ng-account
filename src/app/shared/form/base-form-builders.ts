import { inject } from "@angular/core";
import { FormBuilder } from "@angular/forms";

export abstract class BaseFormBuilders{
  public fb = inject(FormBuilder);
}
