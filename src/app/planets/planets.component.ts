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
  isLoadMoreAvailable = false;
  isAppLoading = false;
  starWarsService = inject(StarWarsService);
  destroyRef = inject(DestroyRef);
  planets: PlanetResult[] = [];

  ngOnInit(): void {
    this.isAppLoading = true;
    this.starWarsService
      .getPlanets()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: data => {
          this.isLoadMoreAvailable = Boolean(data.next);
          this.planets = data.results;
        },
        complete: () => {
          this.isAppLoading = false;
        },
      });
  }

  LoadMore(): void {
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
