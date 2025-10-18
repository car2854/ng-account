import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

type InputType = 'text' | 'password' | 'email' | 'text-area' | 'number';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormInputComponent),
      multi: true,
    },
  ],
  styleUrls: ['./form-input.component.css'],
})
export class FormInputComponent {
  @Input({ required: true }) label: string = '';
  @Input() type: InputType = 'text';
  @Input() placeholder: string = '';

  value!: string;
  onChange = (_: any) => {};

  onChangeTextArea = (e: Event) => {
    this.onChange((e.target as HTMLTextAreaElement).value);
  };

  onTouched = () => {};

  writeValue(value: string): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
