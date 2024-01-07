import { Pipe, PipeTransform } from '@angular/core';
import { Travel } from '../models/travel';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(travels: Travel[], startDate: Date | null, endDate: Date | null): Travel[] {
    console.log(startDate, endDate);
    if(travels.length <= 0){
      return [];
    }

    if(startDate != null && endDate != null) {
      return travels.filter(x => x.startDate >= startDate && x.endDate <= endDate);
    }

    if(startDate != null) {
      return travels.filter(x => x.startDate >= startDate);
    }

    if(endDate != null) {
      return travels.filter(x => x.endDate <= endDate);
    }

    return travels;
  }

}
