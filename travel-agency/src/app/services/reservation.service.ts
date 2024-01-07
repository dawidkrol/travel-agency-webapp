import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private reservations: Reservation[] = [];
  reservationsSubject: BehaviorSubject<Reservation[]> = new BehaviorSubject<Reservation[]>([]);
  reservations$: Observable<Reservation[]> = this.reservationsSubject.asObservable();

  addReservation(reservation: Reservation): void {
    reservation.trip.avaliableNumberOfSpots -= reservation.reservedSeats;
    if(this.reservations.map(x => x.trip).includes(reservation.trip)) {
      this.reservations.find(x => x.trip == reservation.trip)!.reservedSeats += reservation.reservedSeats;
    }
    else {
      this.reservations.push(reservation);
    }
    this.emitChanges();
  }

  removeReservation(reservation: Reservation): void {
    reservation.trip.avaliableNumberOfSpots += reservation.reservedSeats;
    if(this.reservations.map(x => x.trip).includes(reservation.trip)) {
      let reservationFromList = this.reservations.find(x => x.trip == reservation.trip);
      reservationFromList!.reservedSeats -= reservation.reservedSeats;
      if (reservationFromList!.reservedSeats <= 0) {
        this.reservations = this.reservations.filter((selectedReservation) => selectedReservation !== reservationFromList);
      }
    }
    this.emitChanges();
  }

  purchaseReservations(reservationsToPurchase: Reservation[]) {
    this.reservations = this.reservations.filter(x => !reservationsToPurchase.includes(x));
    this.emitChanges();
  }

  calculateReservationAmount(reservation: Reservation) {
    return reservation.trip.unitPrice * reservation.reservedSeats;
  }

  getCountOfReservation() {
    return this.reservations.reduce((total, res) => total + this.calculateReservationAmount(res), 0);
  }

  private emitChanges(): void {
    this.reservationsSubject.next([...this.reservations]);
  }
}
