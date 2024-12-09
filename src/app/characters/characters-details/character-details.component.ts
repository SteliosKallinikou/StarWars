import { Component, inject, input, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { StarWarsService } from '../../core/service';
import { map } from 'rxjs';
import { CharacterProperties } from '../../shared/models';
import { MatButton } from '@angular/material/button';
import { Location } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { RouterLinks } from '../../shared/enums';

@Component({
  selector: 'app-character-details',
  standalone: true,
  imports: [RouterLink, MatButton, MatProgressSpinner],
  templateUrl: './character-details.component.html',
  styleUrl: './character-details.component.scss',
})
export class CharacterDetailsComponent implements OnInit {
  uid = input<string>();
  starWarsService = inject(StarWarsService);
  details: CharacterProperties | undefined;
  // TODO use camelCase for properties, and better name
  p_id: string | undefined;
  // TODO use camelCase for properties
  isApploading = false;
  currURL: string = this.starWarsService.getPrevUrl();

  ngOnInit(): void {
    //TODO we can implement global loading spinner to simplify it
    this.isApploading = true;
    // TODO missing Unsubscribe
    this.starWarsService
      .getCharacterDetails(this.uid())
      .pipe(map(properties => properties.result))
      .subscribe({
        next: data => {
          this.details = data.properties;
          this.p_id = this.details?.homeworld.substring(35);
        },
        complete: () => {
          this.isApploading = false;
        },
      });
  }

  // TODO constructor should be at the top before ngOnInit / all methods
  constructor(
    private router: Router,
    private location: Location
  ) {
    this.currURL = this.location.path();
  }
  // TODO use camelCase for methods -> openHome or better name onHomeClick
  OpenHome(id: string | undefined): void {
    this.router.navigate(['/' + RouterLinks.PLANETS, id]);
  }
}
