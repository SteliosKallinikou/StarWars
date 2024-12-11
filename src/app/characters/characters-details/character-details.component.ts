import { Component, inject, input, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { StarWarsService } from '../../core/service';
import { map, Observable, tap } from 'rxjs';
import { CharacterProperties } from '../../shared/models';
import { MatButton } from '@angular/material/button';
import { AsyncPipe } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { RouterLinks } from '../../shared/enums';

@Component({
  selector: 'app-character-details',
  standalone: true,
  imports: [RouterLink, MatButton, MatProgressSpinner, AsyncPipe],
  templateUrl: './character-details.component.html',
  styleUrl: './character-details.component.scss',
})
export class CharacterDetailsComponent implements OnInit {
  id = input<string>();
  starWarsService = inject(StarWarsService);
  router = inject(Router);
  planetId: string | undefined;
  isAppLoading = false;
  CharacterDetails$: Observable<CharacterProperties>;

  ngOnInit(): void {
    this.isAppLoading = true;
    this.CharacterDetails$ = this.starWarsService.getCharacterDetails(this.id()).pipe(
      map(properties => properties.result.properties),
      tap(details => {
        this.isAppLoading = false;
        details?.homeworld.match(/(\d+)$/).map(element => (this.planetId = element));
      })
    );
  }

  onHomeClick(id: string | undefined): void {
    this.router.navigate(['/' + RouterLinks.PLANETS, id]);
  }
}
