import { Component, OnInit } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { Loader } from "@googlemaps/js-api-loader"
import { map } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  center = {
    lat: 47.49515460273628,
    lng: -30.811021852563577,
  };
}
  
