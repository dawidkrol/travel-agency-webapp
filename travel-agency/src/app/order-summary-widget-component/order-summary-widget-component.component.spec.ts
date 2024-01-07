import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderSummaryWidgetComponentComponent } from './order-summary-widget-component.component';

describe('OrderSummaryWidgetComponentComponent', () => {
  let component: OrderSummaryWidgetComponentComponent;
  let fixture: ComponentFixture<OrderSummaryWidgetComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderSummaryWidgetComponentComponent]
    });
    fixture = TestBed.createComponent(OrderSummaryWidgetComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
