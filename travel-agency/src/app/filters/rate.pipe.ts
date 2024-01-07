import { Pipe, PipeTransform } from '@angular/core';
import { Travel } from '../models/travel';
import { RateService } from '../services/rate.service';

@Pipe({
  name: 'rate'
})
export class RatePipe implements PipeTransform {

  constructor(private rateService: RateService) {}

  transform(travels: Travel[] | null, rates: number[]): Travel[] {
    if (!travels) {
      return [];
    }
    else if (rates.length <= 0) {
      return travels;
    } 
    else {
      return travels.filter(x => rates.includes(this.rateService.getAvgStarRating(x)));
    }
  }
}
