import { Injectable } from '@angular/core';
import { IDataService } from './IDataService';
import { BehaviorSubject, Observable, catchError, map } from 'rxjs';
import { Travel } from '../models/travel';
import { HttpClient } from '@angular/common/http';
import { RateService } from '../services/rate.service';

@Injectable({
  providedIn: 'root'
})
export class CustomApiService implements IDataService {

  private travels: Travel[] = [];
  travelsSubject: BehaviorSubject<Travel[]> = new BehaviorSubject<Travel[]>([]);
  travels$: Observable<Travel[]> = this.travelsSubject.asObservable();
  private _apiUrl: string = 'http://localhost:3001/api/trips/';

  constructor(private httpClient: HttpClient, private rateService: RateService) { }

  getTrips(): Observable<Travel[]> {
    this.httpClient.get(this._apiUrl).subscribe(result => {
      console.log(result);
    });
    this.travels$ = this.httpClient.get<Travel[]>(this._apiUrl);
    return this.travels$;
  }

  deleteTravel(travel: Travel) {
    const deleteUrl = `${this._apiUrl}${travel.id}`;
    console.log(travel, deleteUrl);

    this.httpClient
      .delete(deleteUrl)
      .pipe(
        catchError((error: any) => {
          console.error('Error deleting trip:', error);
          throw error;
        })
      )
      .subscribe(
        () => {
          console.log('Trip deleted successfully.');
          this.getTrips();
        },
        (error) => {
          console.error('Error deleting trip:', error);
        }
      );
  }

  addTravel(travel: Travel) {
    this.travels$.subscribe(result => {
       travel.id = Math.max(...result.map(x => x.id,0)) + 1;
       return this.httpClient.post(this._apiUrl, travel)
       .pipe(
        catchError((error: any) => {
          console.error('Error creating trip:', error);
          throw error;
        })
      )
      .subscribe(
        () => {
          console.log('Trip created successfully.');
          this.getTrips();
        },
        (error) => {
          console.error('Error creating trip:', error);
        }
      );;
    });
  }

  getAvaliableLocalizations() : Observable<string[]>
  {
    return this.travels$.pipe(
      map(travels => {
        if (Array.isArray(travels)) {
          return travels.map(t => t.country);
        } else {
          return [];
        }
      })
    );
  }

  getAvaliableRatings() : Observable<number[]>
  {
    return this.travels$.pipe(
      map(travels => {
        if (Array.isArray(travels)) {
          return travels.map(t => this.rateService.getAvgStarRating(t));
        } else {
          return [];
        }
      })
    );
  }
}
