import { Observable } from "rxjs";
import { Travel } from "../models/travel";

export interface IDataService {
    getTrips: () => Observable<Travel[]>
    deleteTravel: (travel: Travel) => void
    addTravel: (travel: Travel) => void
    getAvaliableLocalizations: () => Observable<string[]>
    getAvaliableRatings: () => Observable<number[]>
}