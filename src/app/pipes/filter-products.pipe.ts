import { Pipe, PipeTransform } from '@angular/core';
import { Card } from '../types/card';

@Pipe({
  name: 'filterProducts'
})
export class FilterProductsPipe implements PipeTransform {

  transform(products: Card[], searchTerm: string): Card[] {
    if (searchTerm) {
      return products.filter(card => card.title.toLowerCase().includes(searchTerm.toLowerCase()));
    } else {
      return products;
    }
  }

}
