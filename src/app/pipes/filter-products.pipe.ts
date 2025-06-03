import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../types/product';


@Pipe({
  name: 'filterProducts'
})
export class FilterProductsPipe implements PipeTransform {

  transform(products: Product[], searchTerm: string): Product[] {
    if (searchTerm) {
      return products.filter(card => card.title.toLowerCase().includes(searchTerm.toLowerCase()));
    } else {
      return products;
    }
  }

}
