// TODO formatting and spacing
import { Component, inject, OnInit } from '@angular/core';
import { StarWarsService } from '../core/service';
import { ShipResult } from '../shared/models';
import { map } from 'rxjs';
import { MatButton } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { RouterLinks } from '../shared/enums';
import { ItemCardComponent } from '../shared/components';

@Component({
  selector: 'app-star-ships',
  standalone: true,
  imports: [MatButton, MatProgressSpinner, ItemCardComponent],
  templateUrl: './star-ships.component.html',
  styleUrl: './star-ships.component.scss',
})
export class StarShipsComponent implements OnInit {
  protected readonly RouterLinks = RouterLinks;
  starWarsService = inject(StarWarsService);
  starShips: ShipResult[] = [];
  // TODO use camelCase for properties
  isAppLoading = false;

  // TODO missing type void
  ngOnInit() {
    // TODO do not forget to unsubscribe and ; at the end of the line
    // TODO missing unsubscription
    this.isAppLoading = true;
    this.starWarsService
      .getShips()
      .pipe(map(result => result.results))
      .subscribe({
        next: data => {
          this.starShips = data;
        },
        complete: () => {
          this.isAppLoading = false;
        },
      });
  }

  // // TODO missing type void
  // ShowDetails(id: string) {
  //   this.router.navigate(['/' + RouterLinks.STAR_SHIPS, id]);
  // }

  // TODO missing type void
  LoadMore() {
    // TODO missing unsubscription
    // also we may improve it if we will use BehaviorSubject and store all data in one place
    this.starWarsService.getMoreStarShips().subscribe({
      // TODO could be simplified just raw example
      //   this.starWarsService.getMoreStarShips().pipe(
      //   map(data => data.results),
      //   map(results => this.starships.push(...results))
      //   ).subscribe();
      next: data => {
        for (let i = 0; i < data.results.length; i++) {
          this.starShips.push(data.results[i]);
        }
      },
    });
  }
}
