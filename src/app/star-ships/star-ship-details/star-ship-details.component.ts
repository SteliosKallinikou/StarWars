import { Component, inject, input, OnInit } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { ShipProperties } from '../../shared/models';
import { StarWarsService } from '../../core/service';
import { CharacterDetailsComponent } from '../../characters/characters-details/character-details.component';
import { AsyncPipe } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-star-ship-details',
  standalone: true,
  imports: [MatButton, RouterLink, CharacterDetailsComponent, AsyncPipe, MatProgressSpinner],
  templateUrl: './star-ship-details.component.html',
  styleUrl: './star-ship-details.component.scss',
})
export class StarShipDetailsComponent implements OnInit {
  starWarsService = inject(StarWarsService);
  id = input<string>();
  shipDetails$: Observable<ShipProperties> | undefined;
  pilots: string[] = [];
  isAppLoading = false;

  ngOnInit(): void {
    this.isAppLoading = true;
    this.shipDetails$ = this.starWarsService.getShipDetails(this.id()).pipe(
      map(property => property.result.properties),
      tap(result => {
        this.isAppLoading = false;
        if (result?.pilots.length) {
          this.pilots = result.pilots.map(pilot => pilot.match(/(\d+)$/)?.[0] || ' ');
        }
      })
    );
  }
}
