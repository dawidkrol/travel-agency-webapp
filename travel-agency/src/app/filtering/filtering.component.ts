import { Component } from '@angular/core';
import { TravelsService } from '../services/travels.service';
import { Travel } from '../models/travel';
import { FilterService } from '../services/filter.service';

@Component({
  selector: 'app-filtering',
  templateUrl: './filtering.component.html',
  styleUrls: ['./filtering.component.css']
})
export class FilteringComponent {
  availableLocations: string[] = [];
  selectedLocations: string[] = [];

  priceRange: { min: number | null, max: number | null } = { min: null, max: null };
  selectedDateRange: { start: Date | null, end: Date | null } = { start: null, end: null };
  
  availableRatings: number[] = [];
  selectedRatings: number[] = [];

  constructor(private travelsService: TravelsService, private filterService: FilterService){
    travelsService.getAvaliableLocalizations().subscribe(x => this.availableLocations = x.filter((item, i, arr) => arr.findIndex((t) => t === item) === i));
    travelsService.getAvaliableRatings().subscribe(x => this.availableRatings = x.filter((item, i, arr) => arr.findIndex((t) => t === item) === i).filter(x => x != 0).sort().reverse());
    travelsService.getTrips().subscribe(result => {
      this.priceRange.max = this.findHighestPrice(result);
    });
    travelsService.getTrips().subscribe(result => {
      this.priceRange.min = this.findLowerPrice(result);
    });
  }

  private findLowerPrice(travels: Travel[]): number {
    if (Array.isArray(travels)) {
      return Math.min(...travels.map(x => x.unitPrice));
    } else {
      return 0;
    }
  }
  
  private findHighestPrice(travels: Travel[]): number {
    if (Array.isArray(travels)) {
      return Math.max(...travels.map(x => x.unitPrice));
    } else {
      return 0;
    }
  }

  updateSelectedLocations(location: string): void {
    if (this.selectedLocations.includes(location)) {
      this.selectedLocations = this.selectedLocations.filter(l => l !== location);
    } else {
      this.selectedLocations.push(location);
    }
    console.log(this.selectedLocations);
  }

  updateSelectedRatings(rating: number): void {
    if (this.selectedRatings.includes(rating)) {
      this.selectedRatings = this.selectedRatings.filter(l => l !== rating);
    } else {
      this.selectedRatings.push(rating);
    }
    console.log(this.selectedRatings);
  }

  applyFilter() {
    this.filterService.setRatings(this.selectedRatings);
    this.filterService.setCountries(this.selectedLocations);
    this.filterService.setStartDate(this.selectedDateRange.start);
    this.filterService.setEndDate(this.selectedDateRange.end);
    this.filterService.setMinPrice(this.priceRange.min);
    this.filterService.setMaxPrice(this.priceRange.max);
  }
}
