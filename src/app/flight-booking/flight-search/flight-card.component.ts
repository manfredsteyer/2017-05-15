
import { Component, Input, EventEmitter, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Flight } from '../../entities/flight';

@Component({
  selector: 'flight-card',
  templateUrl: './flight-card.component.html'
})
export class FlightCardComponent implements OnInit, OnChanges {

  constructor() {
    console.debug('ctor', this.selected, this.item);
  }


  ngOnInit(): void {
    console.debug('init', this.selected, this.item);
    // BAD:
    // this.selectedChange.next(true);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.debug('changes', this.selected, this.item);
    if (changes['item']) {
      console.debug('\t item', changes['item'].firstChange);
    }
    if (changes['selected']) {
      console.debug('\t selected', changes['selected'].firstChange);
    }

  }

  @Input() item: Flight;
  @Input() selected: boolean;
  @Output() selectedChange = new EventEmitter<boolean>();

  select() {
    this.selected = true;
    this.selectedChange.next(/* $event= */ this.selected);
  }

  deselect() {
    this.selected = false;
    this.selectedChange.next(this.selected);
  }

}
