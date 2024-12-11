import { Component, inject, input, OnInit } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { RouterLink } from '@angular/router';
import { PlanetProperties } from '../../shared/models';
import { MatButton } from '@angular/material/button';
import { AsyncPipe, Location } from '@angular/common';
import { StarWarsService } from '../../core/service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { DEFAULT_NOT_FOUND } from '../../shared/consts';

@Component({
  selector: 'app-planet-details',
  standalone: true,
  imports: [MatButton, AsyncPipe, MatProgressSpinner, RouterLink],
  templateUrl: './planet-details.component.html',
  styleUrl: './planet-details.component.scss',
})
export class PlanetDetailsComponent implements OnInit {
  protected readonly DEFAULT_NOT_FOUND = DEFAULT_NOT_FOUND;

  private readonly starWarsService = inject(StarWarsService);
  private readonly location = inject(Location);

  id = input<string>();

  planetDetails$: Observable<PlanetProperties>;
  isAppLoading = false;

  ngOnInit(): void {
    this.isAppLoading = true;
    this.planetDetails$ = this.starWarsService.getPlanetDetails(this.id()).pipe(
      map(properties => properties.result.properties),
      tap(() => {
        this.isAppLoading = false;
      })
    );
  }

  goBack(): void {
    this.location.back();
  }
}
