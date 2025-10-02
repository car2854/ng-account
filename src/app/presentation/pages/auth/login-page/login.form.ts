import {FormBuilder, FormGroup} from '@angular/forms';

export function buildLoginForm(fb: FormBuilder): FormGroup{

  return fb.group({
    email     : [],
    password  : [],
  })

}
