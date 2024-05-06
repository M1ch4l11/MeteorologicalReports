import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[FormatInput]',
  standalone: true,
})
export class FormatInputDirective {
  @Input() type!: string;
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInput(event: any) {
    const valueWithSpaces: String = this.insertSpaces(
      event.target.value,
      this.type === 'countries' ? 2 : 4
    );
    this.el.nativeElement.value = valueWithSpaces.toUpperCase();
  }

  insertSpaces(inputValue: string, countChar: number): string {
    return inputValue
      .replace(/\s/g, '')
      .replace(new RegExp(`(.{${countChar}})`, 'g'), '$1 ');
  }
}
