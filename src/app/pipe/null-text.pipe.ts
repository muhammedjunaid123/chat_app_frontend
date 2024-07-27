import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nullText'
})
export class NullTextPipe implements PipeTransform {

  transform(value: string): string {
    if(value===''){
      return 'unknown'
    }else{
      return value
    }
  }

}
