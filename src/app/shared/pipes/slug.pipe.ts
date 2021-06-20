import { Pipe, PipeTransform } from '@angular/core';
import { TranslCharV } from '../functions/transf-char-v';

@Pipe({
  name: 'slug'
})
export class SlugPipe implements PipeTransform {

  transform(value: string): string {
    let translChar: string = TranslCharV(value);
    let slugTranslate = translChar.replace(/ /g, '-');
    return slugTranslate;
  }

}
