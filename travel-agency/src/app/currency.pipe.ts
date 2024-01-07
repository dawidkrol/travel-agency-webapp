import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currency'
})
export class CurrencyPipe implements PipeTransform {

  currency: string = 'PLN';

  transform(value: number, currency: string | null): unknown {
    if(currency != null){
      this.currency = currency
    }
    switch (this.currency) {
      case 'EUR':
        return Math.round(value * 0.22) + ' ' + this.currency;
      case 'USD':
        return Math.round(value * 0.27) + ' ' + this.currency;
      case 'PLN':
        return value + ' ' + this.currency;
    }
    return null;
  }

}
