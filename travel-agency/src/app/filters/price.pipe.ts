import { Pipe, PipeTransform } from '@angular/core';
import { Travel } from '../models/travel';

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {

  transform(travels: Travel[], minPrice: number | null, maxPrice: number | null): Travel[] {
    if(travels.length <= 0){
      return [];
    }

    if(minPrice != null && maxPrice != null){
      return travels.filter(x => x.unitPrice >= minPrice && x.unitPrice <= maxPrice);
    }

    if(minPrice != null) {
      return travels.filter(x => x.unitPrice >= minPrice);
    }

    if(maxPrice != null) {
      return travels.filter(x => x.unitPrice <= maxPrice);
    }

    return travels;
  }

}
