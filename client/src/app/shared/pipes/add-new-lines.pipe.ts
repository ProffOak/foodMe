import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addNewLines'
})
export class AddNewLinesPipe implements PipeTransform {

  transform(value: string, args?: any): string {
    if(value) {
      return value.replace(/\n/g, '<br>');
    } else {
      return null;
    }
  }

}
