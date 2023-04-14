import { Component, Input, OnInit, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'input-number',
  templateUrl: 'input-number.component.html',
  styleUrls: ['input-number.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputNumberComponent),
      multi: true,
    },
  ],
})
export class InputNumberComponent implements OnInit, ControlValueAccessor {
  @Input() min: number;
  @Input() max: number;
  @Input() placeholder: string;
  @Input() required = false;

  public form!: FormGroup;
  public disabled = false;

  private touched = false;
  private onChange!: (value: number) => void;
  private onTouched!: () => void;

  constructor() {
    this.min = 1;
    this.max = 42;
    this.placeholder = '';
  }

  ngOnInit(): void {
    const validators = [Validators.min(this.min), Validators.max(this.max)];
    if (this.required) {
      validators.push(Validators.required);
    }

    this.form = new FormGroup({
      value: new FormControl(this.min, validators),
    });

    this.form.controls['value'].valueChanges.subscribe((value: number) =>
      this.valueChange(value)
    );
  }

  private valueChange(value: number): void {
    if (this.onChange) {
      this.onChange(value);
    }
    this.markAsTouched();
  }

  private markAsTouched(): void {
    if (!this.touched) {
      if (this.onTouched) {
        this.onTouched();
      }
      this.touched = true;
    }
  }

  writeValue(value: number): void {
    this.form.setValue({ value });
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
