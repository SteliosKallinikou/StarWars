import { Component, inject, OnInit } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { ActivatedRoute, RouterLink } from '@angular/router';
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
  route: ActivatedRoute = inject(ActivatedRoute);
  shipId: string | undefined;
  shipDetails$: Observable<ShipProperties> | undefined;
  pilots: string[] = [];
  // TODO camelCase for isApploading
  isApploading = false;

  ngOnInit(): void {
    this.isApploading = true;
    //TODO we can use input like   id = input<string>();
    this.shipId = this.route.snapshot.params['id'];
    this.shipDetails$ = this.starWarsService.getShipDetails(this.shipId).pipe(
      map(property => property.result.properties),
      tap(result => {
        this.isApploading = false;
        if (result?.pilots.length != 0) {
          for (let i = 0; i < result?.pilots.length; i++) {
            result?.pilots[i].match(/(\d+)$/).map(element => (this.pilots[i] = element));
          }
        }
        //TODO could be simplified
        // if (result?.pilots.length) {
        //   this.pilots = result.pilots.map(pilot => pilot.match(/(\d+)$/)?.[0] || '');
        // }
      })
    );
  }
}
