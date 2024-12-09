import { Component, inject, OnInit } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { UsersResult } from '../shared/models';
import { MatButton } from '@angular/material/button';
import { StarWarsService } from '../core/service';
import { ItemCardComponent } from '../shared/components';
import { RouterLinks } from '../shared/enums';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [MatProgressSpinner, MatButton, ItemCardComponent],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss',
})
export class CharactersComponent implements OnInit {
  protected readonly RouterLinks = RouterLinks;
  // TODO use camelCase for properties
  isApploading = false;
  starWarsService = inject(StarWarsService);
  people: UsersResult[] = [];

  ngOnInit(): void {
    this.isApploading = true;
    // TODO missing Unsubscribe
    this.starWarsService.getUsers().subscribe({
      next: data => {
        this.people = data.results;
      },
      complete: () => {
        this.isApploading = false;
      },
    });
  }

  // TODO type void
  LoadMore() {
    // TODO missing Unsubscribe
    this.starWarsService.getMoreUsers().subscribe({
      next: data => {
        for (let i = 0; i < data.results.length; i++) {
          this.people.push(data.results[i]);
        }
      },
    });
  }
}
