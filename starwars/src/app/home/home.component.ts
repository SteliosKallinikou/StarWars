import {Component, inject, OnInit} from '@angular/core';
import {map} from 'rxjs';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {StarWarsService} from '../service/star-wars.service';
import {AppCharactersComponent} from '../app-characters/app-characters.component';
import {UsersResult} from '../shared/models';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatProgressSpinner,
    AppCharactersComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  isApploading = false
  starWarsService = inject(StarWarsService);
  people: UsersResult[] =[]

  ngOnInit(): void {
    this.isApploading = true
    this.starWarsService.getUsers().pipe(map((result) => result.results)
    ).subscribe({
      next: (data) => {
        this.people = data
      },
      complete: () => {
        this.isApploading = false
      }
    })
  }
}
