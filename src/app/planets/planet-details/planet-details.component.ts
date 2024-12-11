import { Component, inject, OnInit } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PlanetProperties } from '../../shared/models';
import { MatButton } from '@angular/material/button';
import { AsyncPipe, Location } from '@angular/common';
import { StarWarsService } from '../../core/service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-planet-details',
  standalone: true,
  imports: [MatButton, AsyncPipe, MatProgressSpinner, RouterLink],
  templateUrl: './planet-details.component.html',
  styleUrl: './planet-details.component.scss',
})
export class PlanetDetailsComponent implements OnInit {
  starWarsService = inject(StarWarsService);
  planetId: string | undefined;
  route: ActivatedRoute = inject(ActivatedRoute);
  planetDetails$: Observable<PlanetProperties>;
  isApploading = false;

  constructor(private location: Location) {}

  ngOnInit(): void {
    this.isApploading = true;
    this.planetId = this.route.snapshot.params['id'];
    this.planetDetails$ = this.starWarsService.getPlanetDetails(this.planetId).pipe(
      map(properties => properties.result.properties),
      tap(() => {
        this.isApploading = false;
      })
    );
  }

  goBack(): void {
    this.location.back();
  }
}
