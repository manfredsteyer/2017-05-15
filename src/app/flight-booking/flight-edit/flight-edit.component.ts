import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'flight-edit',
  template: `
    <h1>Flight Edit</h1>
    <p>
      Id: {{id}}
    </p>
    <p>
      ShowDetails: {{showDetails}}
    </p>
  `
})
export class FlightEditComponent implements OnInit{
  constructor(private route: ActivatedRoute) {

  }

  id: string;
  showDetails: string;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.showDetails = params['showDetails'];
    });
  }

}
