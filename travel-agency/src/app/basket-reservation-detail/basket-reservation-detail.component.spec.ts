import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketReservationDetailComponent } from './basket-reservation-detail.component';

describe('BasketReservationDetailComponent', () => {
  let component: BasketReservationDetailComponent;
  let fixture: ComponentFixture<BasketReservationDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BasketReservationDetailComponent]
    });
    fixture = TestBed.createComponent(BasketReservationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
