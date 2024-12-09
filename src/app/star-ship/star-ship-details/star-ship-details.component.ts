import { Component, inject, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { ShipProperties } from '../../shared/models';
import { StarWarsService } from '../../core/service';
import { DetailsCardComponent } from '../../details-card/details-card.component';

@Component({
  selector: 'app-star-ship-details',
  standalone: true,
  imports: [MatButton, RouterLink, DetailsCardComponent],
  templateUrl: './star-ship-details.component.html',
  styleUrl: './star-ship-details.component.scss',
})
// TODO formatting
export class StarShipDetailsComponent implements OnInit {
  starWarsService = inject(StarWarsService);
  route: ActivatedRoute = inject(ActivatedRoute);
  ship_id: string | undefined;
  // use camelCase for properties
  shipDetails: ShipProperties | undefined;
  // same here
  pilot: string[] = [];

  //TODO
  // I think better approach could be to use $shipDetails observable and async pipe in template

  // TODO missing type void
  ngOnInit(): void {
    this.ship_id = this.route.snapshot.params['id'];

    // TODO
    // typo in propertie -> property
    // missing unsubscription
    this.starWarsService
      .getShipDetails(this.ship_id)
      .pipe(map(property => property.result))
      .subscribe({
        next: data => {
          // TODO
          // formating
          this.shipDetails = data.properties;
          if (data.properties?.pilots.length != 0) {
            // TODO
            // better approach could be to use forEach instead of for loop
            for (let i = 0; i < data.properties.pilots.length; i++) {
              // TODO
              // don't use magick numbers better use const or enum
              // better approach use regex to get id in case your url will change
              // const idMatch = pilotUrl.match(/\/(\d+)$/);
              // you may get unexpected results
              this.pilot[i] = data.properties?.pilots[i].substring(34);
            }
          }
        },
      });
  }
}
