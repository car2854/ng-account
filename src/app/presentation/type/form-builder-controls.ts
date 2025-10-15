import { FormControl } from "@angular/forms";

export type FormBuilderControls<T> = {
  [K in keyof T]: [T[K], any?] | FormControl<T[K]>;
};
