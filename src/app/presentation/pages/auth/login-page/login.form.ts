import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { LoginForm } from '../../../../core/entities/login-form';
import { FormBuilderControls } from '../../../type/form-builder-controls';
import { inject, Inject, Injectable } from '@angular/core';
import { BaseFormBuilders } from '../../../../shared/form/base-form-builders';

@Injectable({ providedIn: 'root' })
export class LoginFormBuilder extends BaseFormBuilders{
  build = () => {
    return this.fb.group<FormBuilderControls<LoginForm>>({
      password: ['', Validators.required],
      email: ['', Validators.required],
    });
  };
}


