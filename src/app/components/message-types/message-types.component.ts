import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-message-types',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './message-types.component.html',
  styleUrls: ['./message-types.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => MessageTypesComponent),
    },
  ],
})
export class MessageTypesComponent implements ControlValueAccessor {
  @Output() messageType = new EventEmitter<string[]>();
  @ViewChild('messageContainer') messageContainer!: ElementRef;

  value: any = false;
  allCheckedBoxes: string[] = [];

  onChange: any = (value: boolean) => {};
  onTouched: any = () => {};

  constructor() {}

  writeValue(value: any): void {
    this.value = value;
    this.allCheckedBoxes = [];
    this.uncheckAllInputs();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {}

  onInputChange(event: any) {
    this.onChange(event.target.value);
    this.onTouched();
  }

  uncheckAllInputs(): void {
    const checkboxes = this.messageContainer?.nativeElement.querySelectorAll(
      'input[type="checkbox"]'
    );
    checkboxes?.forEach((checkbox: HTMLInputElement) => {
      checkbox.checked = false;
    });
  }

  valueChanged(event: Event, message: string): void {
    this.allCheckedBoxes.push(message);
    this.messageType.emit(this.allCheckedBoxes);
    if (event?.target instanceof HTMLInputElement) {
      this.onChange(event.target?.checked);
      this.onTouched();
    }
  }
}
