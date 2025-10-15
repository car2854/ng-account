import { FormControl, FormGroup } from "@angular/forms";

export function mapFormToDto<T>(form: FormGroup<any>): T {
  const result: any = {};
  for (const key in form.controls) {
    const control = form.controls[key];

    if (control instanceof FormControl) {
      result[key] = control.value;
    } else if (Array.isArray(control)) {
      result[key] = control[0];
    } else {
      result[key] = null;
    }
  }
  return result as T;
}
