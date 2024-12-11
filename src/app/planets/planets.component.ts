import { Component, DestroyRef, inject, OnInit } from '@angular/core';

import { MatButton } from '@angular/material/button';

import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { StarWarsService } from '../core/service';
import { PlanetResult } from '../shared/models';
import { RouterLinks } from '../shared/enums';
import { ItemCardComponent } from '../shared/components';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-planets',
  standalone: true,
  imports: [MatButton, MatProgressSpinner, ItemCardComponent],
  templateUrl: './planets.component.html',
  styleUrl: './planets.component.scss',
})
export class PlanetsComponent implements OnInit {
  protected readonly RouterLinks = RouterLinks;
  // TODO use camelCase for properties
  isLoadMoreAvailable = false;
  isApploading = false;
  starWarsService = inject(StarWarsService);
  destroyRef = inject(DestroyRef);
  planets: PlanetResult[] = [];

  ngOnInit(): void {
    this.isApploading = true;
    // TODO missing Unsubscribe
    this.starWarsService
      .getPlanets()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: data => {
          this.isLoadMoreAvailable = Boolean(data.next);
          this.planets = data.results;
        },
        complete: () => {
          this.isApploading = false;
        },
      });
  }

  // TODO type void
  LoadMore(): void {
    // TODO missing Unsubscribe
    this.starWarsService
      .getMorePlanets()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: data => {
          this.planets = data.results;
          this.isLoadMoreAvailable = Boolean(data.next);
        },
      });
  }
}
