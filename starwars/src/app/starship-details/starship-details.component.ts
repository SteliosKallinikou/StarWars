import { Component, inject, OnInit } from '@angular/core';
import { StarWarsService } from '../service/star-wars.service';
import { map } from 'rxjs';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ShipProperties } from '../shared/models';
import { MatButton } from '@angular/material/button';
import { DetailsComponentComponent } from '../details-component/details-component.component';

@Component({
  selector: 'app-starship-details',
  standalone: true,
  imports: [
    MatButton,
    RouterLink,
    DetailsComponentComponent
  ],
  templateUrl: './starship-details.component.html',
  styleUrl: './starship-details.component.scss'
})
// TODO formatting
export class StarshipDetailsComponent implements OnInit {
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
    this.ship_id = this.route.snapshot.params['id']

    // TODO
    // typo in propertie -> property
    // missing unsubscription
    this.starWarsService.getShipDetails(this.ship_id).pipe(
      map((property)=> property.result)
    ).subscribe({
      next:(data)=> {
        // TODO
        // formating
        this.shipDetails = data.properties;
        if (data.properties?.pilots.length != 0) {
          // TODO
          // better approach could be to use forEach instead of for loop
           for (let i= 0; i < data.properties.pilots.length; i++)
             {
               // TODO
               // don't use magick numbers better use const or enum
               // better approach use regex to get id in case your url will change
               // you may get unexpected results
               this.pilot[i]=data.properties?.pilots[i].substring(34)
             }
         }
      }
    })
  }
}
