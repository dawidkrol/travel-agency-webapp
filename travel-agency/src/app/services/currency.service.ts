import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  public currency: string = 'PLN';
  private avaliableCurrencies: string[] = ['PLN','EUR','USD'] 
  
  public getCurrency() {
    return this.currency;
  }

  public setCurrency(newCurrency: string) {
    if(this.avaliableCurrencies.includes(newCurrency)) {
      this.currency = newCurrency;
    }
  }

  public getAvaliableCurrencies() {
    return this.avaliableCurrencies;
  }

}
