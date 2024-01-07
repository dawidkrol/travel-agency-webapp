import { Component } from '@angular/core';
import { Reservation } from '../models/reservation';
import { ReservationService } from '../services/reservation.service';
import { CurrencyService } from '../services/currency.service';

@Component({
  selector: 'app-order-summary-widget-component',
  templateUrl: './order-summary-widget-component.component.html',
  styleUrls: ['./order-summary-widget-component.component.css']
})
export class OrderSummaryWidgetComponentComponent {
  public reservations: Reservation[] = [];

  constructor(private reservationService: ReservationService, public currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.reservationService.reservations$.subscribe((trips) => {
      this.reservations = trips;
    });
  }

  calculateTotalCost(): number {
    return this.reservations.reduce((partialSum, a) => partialSum + (a.trip.unitPrice * a.reservedSeats), 0);
  }
  
  calculateTotalSeats(): number {
    return this.reservations.map(x => x.reservedSeats).reduce((partialSum, a) => partialSum + a, 0);
  }
}
