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
  uid = input<string>();
  starWarsService = inject(StarWarsService);
  // TODO use camelCase for properties, and better name
  planetId: string | undefined;
  // TODO use camelCase for properties
  isApploading = false;

  details$: Observable<CharacterProperties>;

  // TODO constructor should be at the top before ngOnInit / all methods
  constructor(private router: Router) {}

  ngOnInit(): void {
    //TODO we can implement global loading spinner to simplify it
    this.isApploading = true;
    // TODO missing Unsubscribe
    this.details$ = this.starWarsService.getCharacterDetails(this.uid()).pipe(
      map(properties => properties.result.properties),
      tap(details => {
        this.isApploading = false;
        details?.homeworld.match(/(\d+)$/).map(element => (this.planetId = element));
      })
    );
  }

  // TODO use camelCase for methods -> openHome or better name onHomeClick
  openHomeClick(id: string | undefined): void {
    this.router.navigate(['/' + RouterLinks.PLANETS, id]);
  }
}
