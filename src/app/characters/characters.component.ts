import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatButton } from '@angular/material/button';
import { StarWarsService } from '../core/service';
import { ItemCardComponent } from '../shared/components';
import { RouterLinks } from '../shared/enums';
import { CharacterResult } from '../shared/models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [MatProgressSpinner, MatButton, ItemCardComponent],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss',
})
export class CharactersComponent implements OnInit {
  protected readonly RouterLinks = RouterLinks;

  private readonly starWarsService = inject(StarWarsService);
  private readonly destroyRef = inject(DestroyRef);

  isLoadMoreAvailable = false;
  isAppLoading = false;
  characters: CharacterResult[];

  ngOnInit(): void {
    this.isAppLoading = true;
    this.starWarsService
      .getCharacters()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: data => {
          this.isLoadMoreAvailable = Boolean(data.next);
          this.characters = data.results;
        },
        complete: () => {
          this.isAppLoading = false;
        },
      });
  }

  LoadMore(): void {
    this.starWarsService
      .getMoreCharacters()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: data => {
          this.characters = data.results;
          this.isLoadMoreAvailable = Boolean(data.next);
        },
      });
  }
}
