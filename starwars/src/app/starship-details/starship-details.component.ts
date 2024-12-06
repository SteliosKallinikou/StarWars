import {Component, inject, input, OnInit} from '@angular/core';
import {StarWarsService} from '../service/star-wars.service';
import {map} from 'rxjs';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {ShipProperties} from '../shared/models';
import {MatButton} from '@angular/material/button';


@Component({
  selector: 'app-starship-details',
  standalone: true,
  imports: [
    MatButton,
    RouterLink
  ],
  templateUrl: './starship-details.component.html',
  styleUrl: './starship-details.component.scss'
})
export class StarshipDetailsComponent implements OnInit{

  starWarsService = inject(StarWarsService);
  route:ActivatedRoute= inject(ActivatedRoute)
  ship_id: string|undefined
  ShipDetails: ShipProperties|undefined

  ngOnInit() {
    this.ship_id = this.route.snapshot.params['id']

    this.starWarsService.getShipDetails(this.ship_id).pipe(map((propertie)=>propertie.result)).subscribe({
      next:(data)=>{
        this.ShipDetails=data.properties
      }
    })

  }
}
