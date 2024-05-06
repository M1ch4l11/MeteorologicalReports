import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateLocal',
  standalone: true,
})
export class DateLocalPipe implements PipeTransform {
  transform(value: string, format: string = 'medium'): string | null {
    const datePipe = new DatePipe('en-US');
    const date = new Date(value);
    const localDate = new Date(
      date.getTime() + date.getTimezoneOffset() * 60000
    );
    return datePipe.transform(localDate, format);
  }
}
