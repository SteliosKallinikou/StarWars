import {Component,  inject, OnInit} from '@angular/core';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {StarWarsService} from '../service/star-wars.service';
import {AppCharactersComponent} from '../app-characters/app-characters.component';
import {UsersResult} from '../shared/models';
import {MatButton} from '@angular/material/button';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatProgressSpinner,
    AppCharactersComponent,
    MatButton,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  isApploading = false
  starWarsService = inject(StarWarsService);
  people: UsersResult[] = []


  ngOnInit(): void {
    this.isApploading = true
    this.starWarsService.getUsers().subscribe({
      next: (data) => {
        this.people = data.results
      },
      complete: () => {
        this.isApploading = false
      }
    })
  }

  LoadMore(){
    this.starWarsService.getMoreUsers().subscribe({
      next:(data)=>{
        for(let i=0;i<data.results.length;i++){
          this.people.push(data.results[i])
        }
      }
    })
  }
}
