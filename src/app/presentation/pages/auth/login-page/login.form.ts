import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { LoginForm } from '../../../../core/entities/login-form';
import { FormBuilderControls } from '../../../type/form-builder-controls';

export function buildLoginForm(fb: FormBuilder) {
  return fb.group<FormBuilderControls<LoginForm>>({
    password: ['', Validators.required],
    email: ['', Validators.required],
  });
}

