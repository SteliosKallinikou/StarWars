import { Component, inject, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { StarWarsService } from '../core/service';
import { PlanetResult } from '../shared/models';
import { RouterLinks } from '../shared/enums';
import { ItemCardComponent } from '../shared/components';

@Component({
  selector: 'app-planets',
  standalone: true,
  imports: [MatButton, MatProgressSpinner, ItemCardComponent],
  templateUrl: './planets.component.html',
  styleUrl: './planets.component.scss',
})
export class PlanetsComponent implements OnInit {
  protected readonly RouterLinks = RouterLinks;
  starWarsService = inject(StarWarsService);
  planets: PlanetResult[] = [];
  //TODO should be camelCase
  isApploading = false;

  constructor(private router: Router) {}

  // TODO missing type void
  ngOnInit() {
    // TODO missing Unsubscribe
    this.isApploading = true;
    this.starWarsService
      .getPlanets()
      .pipe(map(result => result.results))
      .subscribe({
        next: data => {
          this.planets = data;
        },
        complete: () => {
          this.isApploading = false;
        },
      });
  }

  // // TODO missing type void, camelCase and naming should be better -> onDetailsClick
  // Details(id: string) {
  //   this.router.navigate(['/' + RouterLinks.PLANETS, id]);
  // }

  // TODO missing type void, and camelCase
  LoadMore() {
    // TODO missing Unsubscribe
    this.starWarsService.getMorePlanets().subscribe({
      next: data => {
        for (let i = 0; i < data.results.length; i++) {
          this.planets.push(data.results[i]);
        }
      },
    });
  }
}
