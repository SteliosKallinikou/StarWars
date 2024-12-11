// TODO formatting and spacing
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { StarWarsService } from '../core/service';
import { ShipResult } from '../shared/models';
import { MatButton } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { RouterLinks } from '../shared/enums';
import { ItemCardComponent } from '../shared/components';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-star-ships',
  standalone: true,
  imports: [MatButton, MatProgressSpinner, ItemCardComponent],
  templateUrl: './star-ships.component.html',
  styleUrl: './star-ships.component.scss',
})
export class StarShipsComponent implements OnInit {
  protected readonly RouterLinks = RouterLinks;

  isLoadMoreAvailable = false;
  isAppLoading = false;
  starWarsService = inject(StarWarsService);
  destroyRef = inject(DestroyRef);
  starShips: ShipResult[] = [];

  ngOnInit(): void {
    this.isAppLoading = true;
    this.starWarsService
      .getShips()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: data => {
          this.isLoadMoreAvailable = Boolean(data.next);
          this.starShips = data.results;
        },
        complete: () => {
          this.isAppLoading = false;
        },
      });
  }

  LoadMore(): void {
    this.starWarsService
      .getMoreStarShips()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: data => {
          this.starShips = data.results;
          this.isLoadMoreAvailable = Boolean(data.next);
        },
      });
  }
}
