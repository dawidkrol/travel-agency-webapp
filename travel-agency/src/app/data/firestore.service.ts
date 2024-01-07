import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { Travel } from '../models/travel';
import { RateService } from '../services/rate.service';
import { IDataService } from './IDataService';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService implements IDataService {
  travelsDatabase: AngularFirestoreCollection<Travel>;

  constructor(private firestore: AngularFirestore,
    public rateService: RateService) 
  {
    this.travelsDatabase = firestore.collection<Travel>('travels');
  }

  getTrips(): Observable<Travel[]> {
    return this.travelsDatabase.valueChanges();
  }

  deleteTravel(travel: Travel) {
    this.findDocumentIdByFieldValue(travel.id).subscribe(result => {
      const myId = result.toString();
      
      if (myId) {
        this.travelsDatabase.doc(myId).delete().then(() => {
          console.log('Document deleted successfully.');
        }).catch(error => {
          console.error('Error deleting document:', error);
        });
      } else {
        console.warn('Document ID not found.');
      }
    });
  }

  addTravel(travel: Travel) {
    this.getTrips().subscribe(result => {
       travel.id = Math.max(...result.map(x => x.id)) + 1;
       return this.travelsDatabase.add({...travel});
    });
  }

  getAvaliableLocalizations() : Observable<string[]>
  {
    return this.getTrips().pipe(map(x => x.map(t => t.country)))
  }

  getAvaliableRatings() : Observable<number[]>
  {
    return this.getTrips().pipe(map(x => x.map(t => this.rateService.getAvgStarRating(t))))
  }

  findDocumentIdByFieldValue(id: number): Observable<string> {
    return this.firestore.collection('travels', ref => ref.where('id', '==', id))
      .snapshotChanges()
      .pipe(
        map(actions => {
          const doc = actions[0];
          return doc.payload.doc.id;
        })
    );
  }
}
