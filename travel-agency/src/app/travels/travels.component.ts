import { Component, OnInit } from '@angular/core';
import { Travel } from '../models/travel';
import { TravelsService } from '../services/travels.service';
import { FilterService } from '../services/filter.service';
import { Observable, max, min } from 'rxjs';
import { Reservation } from '../models/reservation';
import { ReservationService } from '../services/reservation.service';
import { CurrencyService } from '../services/currency.service';
import { publishFacade } from '@angular/compiler';
import { RateService } from '../services/rate.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-travels',
  templateUrl: './travels.component.html',
  styleUrls: ['./travels.component.css']
})

export class TravelsComponent {
  public travels: Travel[] = [];
  public reservedTrips: number = 0;
  public p: number = 1;
  public itemsPerPage: number = 6;

  constructor(public travelsService: TravelsService, public filterService: FilterService, 
    private reservationService: ReservationService, public currencyService: CurrencyService,
    public rateService: RateService, public authService: AuthService) 
  {
    this.travelsService.getTrips().subscribe(result => {
      this.travels = result;
    });
    this.reservationService.reservations$.subscribe(result => {
      this.reservedTrips = result.reduce((total, res) => total + res.reservedSeats, 0);
    })
  }

  reserveSpot(trip: Travel): void {
    if (trip.avaliableNumberOfSpots > 0) {
      let a: Reservation = {
        trip: trip,
        reservedSeats: 1,
        selected: true
      };
      this.reservationService.addReservation(a);
    }
  }

  cancelReservation(trip: Travel): void {
    if (this.reservedTrips > 0) {
      let a: Reservation = {
        trip: trip,
        reservedSeats: 1,
        selected: true
      };
      this.reservationService.removeReservation(a);
    }
  }

  getClass(trip: Travel): any {

    let minPrice = Math.min(...this.travels.map(x => x.unitPrice));
    let maxPrice = Math.max(...this.travels.map(x => x.unitPrice));

    if(this.travels.length < 3){
      return 'witchoutBorder'
    }
    
    if(trip.unitPrice == minPrice) {
      return 'cheapest';
    }

    if(trip.unitPrice == maxPrice){
      return 'mostExpensive';
    }

    return 'witchoutBorder'
  }

  changeRate(rate: number) {
    console.log(rate);
  }

  deleteTravel(travel: Travel) {
    this.travelsService.deleteTravel(travel);
  }

  providerChanged(provider: string){
    this.travelsService.setDataProvider(provider);
    this.travelsService.getTrips().subscribe(result => {
      this.travels = result;
    });
    this.reservationService.reservations$.subscribe(result => {
      this.reservedTrips = result.reduce((total, res) => total + res.reservedSeats, 0);
    })
  }
}