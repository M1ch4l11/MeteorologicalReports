import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[FormatInput]',
  standalone: true,
})
export class FormatInputDirective {
  @Input() type!: string;
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event.target'])
  onInput(target: HTMLInputElement) {
    const previousValue = target.getAttribute('data-previous-value') || '';
    const currentValue = target.value;

    if (currentValue.length < previousValue.length) {
      target.setAttribute('data-previous-value', currentValue);
      return;
    }

    const valueWithSpaces: string = this.insertSpaces(
      target.value,
      this.type === 'countries' ? 2 : 4
    );

    this.el.nativeElement.value = valueWithSpaces.toUpperCase();
    target.setAttribute('data-previous-value', valueWithSpaces);
  }

  insertSpaces(inputValue: string, countChar: number): string {
    return inputValue
      .replace(/\s/g, '')
      .replace(new RegExp(`(.{${countChar}})`, 'g'), '$1 ');
  }
}
