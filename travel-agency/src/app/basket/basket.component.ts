import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../services/reservation.service';
import { Reservation } from '../models/reservation';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  reservations: Reservation[] = [];

  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.reservationService.reservations$.subscribe((reservations) => {
      this.reservations = reservations;
    });
  }

  purchase(): void {
    const selectedReservations = this.reservationService.reservationsSubject.value.filter(
      (res) => res.selected
    );

    this.reservationService.purchaseReservations(selectedReservations);
  }

  calculateTotal(): number {
    return this.reservations.reduce((total, res) => total + this.reservationService.calculateReservationAmount(res), 0);
  }

}
