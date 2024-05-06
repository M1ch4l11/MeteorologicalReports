import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'messageType',
  standalone: true,
})
export class MessageTypePipe implements PipeTransform {
  transform(value: string): string {
    return value.length > 5 ? value.replace('_LONGTAF', '') : value;
  }
}
