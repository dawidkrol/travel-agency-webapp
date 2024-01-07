import { Travel } from "./travel";

export interface Reservation {
    trip: Travel;
    reservedSeats: number;
    selected: boolean;
  }