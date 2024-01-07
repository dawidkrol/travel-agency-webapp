import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TravelsService } from '../services/travels.service';
import { Travel } from '../models/travel';
import { CurrencyService } from '../services/currency.service';
import { Reservation } from '../models/reservation';
import { ReservationService } from '../services/reservation.service';
import { RateService } from '../services/rate.service';
import { Rate } from '../models/rate';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-travel-details',
  templateUrl: './travel-details.component.html',
  styleUrls: ['./travel-details.component.css']
})
export class TravelDetailsComponent {
  
reviewForm: Rate = {
  travelID: 0,
  starRate: 1,
  nick: '',
  name: '',
  description: '',
  dateOfPurchase: null,
};

public travel: Travel = {
  id: 0,
  name: '',
  description: '',
  country: '',
  startDate: new Date(),
  endDate: new Date(),
  photoLink: '',
  maximumNumberOfSpots: 0,
  avaliableNumberOfSpots: 0,
  unitPrice: 0};

errors: string[] = [];

reviews: any[] = [];
reservedTrips: number = 0;

constructor(private route: ActivatedRoute, private travelService: TravelsService, 
  public currencyService: CurrencyService, public reservationService: ReservationService,
  public rateService: RateService, public authService: AuthService) 
{
  const travelId = this.route.snapshot.params['id'];
  this.travelService.getTrips().subscribe(result => {
    this.travel = result.find(x => x.id == travelId)!;
  });
  this.reservationService.reservations$.subscribe(result => {
    this.reservedTrips = result.reduce((total, res) => total + res.reservedSeats, 0);
  });
  this.rateService.rates$.subscribe(result => {
    this.reviews = result;
  })
}

addReview() {
  this.errors = [];
  if (!this.reviewForm.name || !this.reviewForm.description) {
    this.errors.push('Fill all required fields');
    return;
  }

  if (this.reviewForm.description.length < 50 || this.reviewForm.description.length > 500){
    this.errors.push('Description should be between 50 and 500 characters long.');
    return;
  }
  this.reviewForm.travelID = this.travel.id
  this.rateService.addRate(this.reviewForm);

  this.reviewForm = {
    travelID: this.travel.id,
    starRate: 1,
    nick: '',
    name: '',
    description: '',
    dateOfPurchase: null,
  };
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
changeRate(rate: number) {
  this.reviewForm.starRate = rate;
}
}
