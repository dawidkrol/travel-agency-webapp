import { Component, Input } from '@angular/core';
import { Reservation } from '../models/reservation';
import { ReservationService } from '../services/reservation.service';
import { Travel } from '../models/travel';
import { CurrencyService } from '../services/currency.service';

@Component({
  selector: 'app-basket-reservation-detail',
  templateUrl: './basket-reservation-detail.component.html',
  styleUrls: ['./basket-reservation-detail.component.css']
})
export class BasketReservationDetailComponent {
  @Input() reservation!: Reservation;

  constructor(private reservationService: ReservationService, public currencyService: CurrencyService) {}

  returnReservation(): void {
    this.reservationService.removeReservation(this.reservation!);
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
    if (this.reservation.reservedSeats > 0) {
      let a: Reservation = {
        trip: trip,
        reservedSeats: 1,
        selected: true
      };
      this.reservationService.removeReservation(a);
    }
  }
}
