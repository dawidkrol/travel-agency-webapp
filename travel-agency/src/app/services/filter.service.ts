import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private startDate: Date | null = null;
  private endDate: Date | null = null;
  private minPrice: number | null = null;
  private maxPrice: number | null = null;
  private countries: string[] = [];
  private ratings: number[] = [];

  constructor() { }

  setStartDate(startDate: Date | null) {
    this.startDate = startDate;
  }

  getStartDate() : Date | null {
    return this.startDate;
  }

  setEndDate(endDate: Date | null) {
    this.endDate = endDate;
  }

  getEndDate() : Date | null {
    return this.endDate;
  }

  setMinPrice(minPrice: number | null) {
    this.minPrice = minPrice;
  }

  getMinPrice() : number | null {
    return this.minPrice;
  }

  setMaxPrice(maxPrice: number | null) {
    this.maxPrice = maxPrice;
  }

  getMaxPrice() : number | null {
    return this.maxPrice;
  }

  setRatings(ratings: number[]) {
    this.ratings = ratings;
  }

  getRatings() : number[] {
    return this.ratings;
  }

  setCountries(countries: string[]) {
    this.countries = countries;
  }

  getCountries() : string[] {
    return this.countries;
  }
}
