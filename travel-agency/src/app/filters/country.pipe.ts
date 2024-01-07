import { Pipe, PipeTransform } from '@angular/core';
import { Travel } from '../models/travel';

@Pipe({
  name: 'country'
})
export class CountryPipe implements PipeTransform {

  transform(travels: Travel[], countries: string[]): Travel[] {
    if (!travels) {
      return [];
    }
    else if (countries.length <= 0) {
      return travels;
    } 
    else {
      let data = travels.filter(x => countries.includes(x.country));
      return data;
    }
  }

}
