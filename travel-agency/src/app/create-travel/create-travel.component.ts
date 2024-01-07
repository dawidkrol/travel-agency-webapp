import { Component } from '@angular/core';
import { Travel } from '../models/travel';
import { TravelsService } from '../services/travels.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-travel',
  templateUrl: './create-travel.component.html',
  styleUrls: ['./create-travel.component.css']
})

export class CreateTravelComponent {
  errors: string[] = [];
  travelModel: Travel = {
    id: 0,
    name: '',
    description: '',
    country: '',
    startDate: new Date(),
    endDate: new Date(),
    photoLink: '',
    maximumNumberOfSpots: 0,
    avaliableNumberOfSpots: 0,
    unitPrice: 0,
  }

  constructor(private travelsService: TravelsService, private router: Router) {}

  submitForm(form: any): void {
    this.errors = [];
    if (form.valid) {
      console.log('Form data:', this.travelModel);
      this.travelsService.addTravel(this.travelModel);
      this.router.navigate(['']);
    }
    this.errors.push('Fill all required fields');
    return;
  }
}
