import { Injectable } from '@angular/core';
import { Travel } from '../models/travel';
import { Observable } from 'rxjs';
import { IDataService } from '../data/IDataService';
import { FirestoreService } from '../data/firestore.service';
import { CustomApiService } from '../data/custom-api.service';

@Injectable({
  providedIn: 'root'
})
export class TravelsService {
  public avaliableProviders: string[] = ['firestore', 'customapi'];
  public provider: string = '';

  private dataService: IDataService;

  constructor(private firestoreService: FirestoreService, private customApi: CustomApiService) 
  {
    this.dataService = firestoreService;
    this.setDataProvider('firestore');
  }

  setDataProvider(provider: string){
    if(provider == 'firestore'){
      this.dataService = this.firestoreService;
      this.provider = provider;
    }
    else if(provider == 'customapi'){
      this.dataService = this.customApi;
      this.provider = provider;
    }
  }

  getTrips(): Observable<Travel[]> {
    return this.dataService.getTrips();
  }

  deleteTravel(travel: Travel) {
    this.dataService.deleteTravel(travel);
  }

  addTravel(travel: Travel) {
    this.dataService.addTravel(travel);
  }

  getAvaliableLocalizations() : Observable<string[]>
  {
    return this.dataService.getAvaliableLocalizations();
  }

  getAvaliableRatings() : Observable<number[]>
  {
    return this.dataService.getAvaliableRatings();
  }
}