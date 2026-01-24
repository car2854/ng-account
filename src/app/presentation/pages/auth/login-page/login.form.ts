import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { LoginForm } from '../../../../core/entities/login-form';
import { FormBuilderControls } from '../../../type/form-builder-controls';
import { inject, Inject, Injectable, isDevMode } from '@angular/core';
import { BaseFormBuilders } from '../../../../shared/form/base-form-builders';

@Injectable({ providedIn: 'root' })
export class LoginFormBuilder extends BaseFormBuilders {
  override build = () => {
    return this.fb.group<FormBuilderControls<LoginForm>>({
      password: [isDevMode() ? '123456789' : '', Validators.required],
      email: [isDevMode() ? 'Carlos@gmail.com' : '', Validators.required],
    });
  };
}


