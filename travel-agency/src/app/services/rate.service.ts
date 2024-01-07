import { Injectable } from '@angular/core';
import { Travel } from '../models/travel';
import { Rate } from '../models/rate';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RateService {
  private rates: Rate[] = [];
  ratesSubject: BehaviorSubject<Rate[]> = new BehaviorSubject<Rate[]>([]);
  rates$: Observable<Rate[]> = this.ratesSubject.asObservable();

  getAvgStarRating(travel: Travel) : number {
    const rates = this.rates.filter(x => x.travelID == travel.id).map(x => x.starRate)
    const sum = this.getSumOfRates(travel);
    const avg = (sum / rates?.length) || 0;
    return Math.min(Math.ceil(avg),5);
  }

  getSumOfRates(travel: Travel) : number {
    const rates = this.rates?.filter(x => x.travelID == travel.id).map(x => x.starRate)
    const sum = rates?.reduce((a, b) => a + b, 0);
    return sum | 0;
  }

  getTravelRates(travel: Travel) {
    return this.rates?.filter(x => x.travelID == travel.id);
   }

  addRate(rate: Rate){
    this.rates.push(rate);
    this.emitChanges();
  }

  private emitChanges(): void {
    this.ratesSubject.next([...this.rates]);
  }
}
