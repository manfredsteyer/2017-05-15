import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'flight-edit',
  template: `
    <h1>Flight Edit</h1>
    <div class="card">
    <p>
      Id: {{id}}
    </p>
    <p>
      ShowDetails: {{showDetails}}
    </p>
    </div>
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

    this.route.data.subscribe(data => {
      let flight = data['flight'];
      console.debug('flight from resolver', flight);
    })
  }

}
