import { Component, ElementRef, Input, booleanAttribute, getNgModuleById, numberAttribute } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent {
  numberOfStars: number = 5;
  @Input({required: true, transform: numberAttribute}) rate!: number;
  @Input({required: true, transform: booleanAttribute}) canRate!: boolean;
  starWidth: number = 25;
  @Output() newRate = new EventEmitter<number>();

  setRate(event: MouseEvent, starContainer: HTMLDivElement): void {
    if(this.canRate == false){
      return;
    }

    const containerRect = starContainer.getBoundingClientRect();
    const x = event.clientX - containerRect.left;

    this.rate = Math.min(Math.ceil(x/this.starWidth),5);

    this.newRate.emit(this.rate);
  }

  filledStars() : number {
    return this.rate;
  }

  emptyStars() : number {
    return this.numberOfStars - this.rate;
  }

}
