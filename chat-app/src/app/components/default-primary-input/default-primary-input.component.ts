import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

type InputTypes = "text" | "email" | "password"

@Component({
  selector: 'app-default-primary-input',
  imports: [],
  templateUrl: './default-primary-input.component.html',
  styleUrl: './default-primary-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DefaultPrimaryInputComponent),
      multi: true
    }
  ]
})
export class DefaultPrimaryInputComponent implements ControlValueAccessor{
  @Input() type: InputTypes = 'text';
  @Input() placeholder: string = '';
  @Input() label: string = '';
  @Input() inputName: string = ''

  value: string = ''
  onChange = (_: any) => { };
  onTouched = () => { };
  setDisabledState?(): void { }

  writeValue(value: any): void {
    this.value = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  handleInput(event: Event): void {
    const input = (event.target as HTMLInputElement).value;
    this.value = input;
    this.onChange(this.value);
  }
}
