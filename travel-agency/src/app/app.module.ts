import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TravelsComponent } from './travels/travels.component';
import { RouterModule } from '@angular/router';
import { CreateTravelComponent } from './create-travel/create-travel.component';
import { FormsModule } from '@angular/forms';
import { StarsComponent } from './rating/stars/stars.component';
import { CountryPipe } from './filters/country.pipe';
import { PricePipe } from './filters/price.pipe';
import { DatePipe } from './filters/date.pipe';
import { RatePipe } from './filters/rate.pipe';
import { FilteringComponent } from './filtering/filtering.component';
import { enviroment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { FirestoreModule } from '@angular/fire/firestore';
import { OrderSummaryWidgetComponentComponent } from './order-summary-widget-component/order-summary-widget-component.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { BasketComponent } from './basket/basket.component';
import { BasketReservationDetailComponent } from './basket-reservation-detail/basket-reservation-detail.component';
import { HomeComponent } from './home/home.component';
import { TravelDetailsComponent } from './travel-details/travel-details.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CurrencyPipe } from './currency.pipe';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { ManagerGuard } from './guards/manager.guard';
import { GoogleMapsModule } from '@angular/google-maps'

@NgModule({
  declarations: [
    AppComponent,
    TravelsComponent,
    CreateTravelComponent,
    StarsComponent,
    CountryPipe,
    PricePipe,
    DatePipe,
    RatePipe,
    FilteringComponent,
    OrderSummaryWidgetComponentComponent,
    NavMenuComponent,
    BasketComponent,
    BasketReservationDetailComponent,
    HomeComponent,
    TravelDetailsComponent,
    CurrencyPipe,
    RegistrationComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'treavels', component: TravelsComponent },
      { path: 'create', component: CreateTravelComponent, canActivate: [ManagerGuard] },
      { path: 'basket', component: BasketComponent, canActivate: [AuthGuard] },
      { path: 'treavels/:id', component: TravelDetailsComponent, canActivate: [AuthGuard] },
      { path: 'register', component: RegistrationComponent },
      { path: 'login', component: LoginComponent },
    ]),
    AngularFireModule.initializeApp(enviroment.firebaseConfig),
    FirestoreModule,
    NgxPaginationModule,
    GoogleMapsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
