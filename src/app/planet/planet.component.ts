import { Component, inject, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { PlanetProperties } from '../shared/models';
import { MatButton } from '@angular/material/button';
import { Location } from '@angular/common';
import { StarWarsService } from '../core/service';

@Component({
  selector: 'app-planet',
  standalone: true,
  imports: [RouterOutlet, MatButton, RouterLink],
  templateUrl: './planet.component.html',
  styleUrl: './planet.component.scss',
})
export class PlanetComponent implements OnInit {
  starWarsService = inject(StarWarsService);
  //TODO should be better naming for properties p_id -> planetId or id
  p_id: string | undefined;
  route: ActivatedRoute = inject(ActivatedRoute);
  planetDetails: PlanetProperties | undefined;
  prevUrl: string = this.starWarsService.getPrevUrl();

  constructor(private location: Location) {}

  // TODO missing type void
  ngOnInit() {
    this.p_id = this.route.snapshot.params['id'];
    // TODO missing Unsubscribe
    // TODO could be $planetDetails observable and async pipe in template
    this.starWarsService
      .getPlanetDetails(this.p_id)
      .pipe(map(properties => properties.result))
      .subscribe({
        next: data => {
          this.planetDetails = data.properties;
        },
      });
  }

  // TODO missing type void
  goBack() {
    this.location.back();
  }
}
