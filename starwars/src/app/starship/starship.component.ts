// TODO formatting and spacing
import {Component,inject,OnInit} from '@angular/core';
import {StarWarsService} from '../service/star-wars.service';
import {ShipResult} from '../shared/models';
import {map} from 'rxjs';
import {MatButton} from '@angular/material/button';
import {Router, RouterLinkActive} from '@angular/router';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-starship',
  standalone: true,
  imports: [
    MatButton,
    RouterLinkActive,
    MatProgressSpinner
  ],
  templateUrl: './starship.component.html',
  styleUrl: './starship.component.scss'
})
export class StarshipComponent implements OnInit {
  starWarsService = inject(StarWarsService);
  starships: ShipResult[] = [];
  // TODO use camelCase for properties
  isAppLoading = false

  constructor(private router: Router) {}

  // TODO missing type void
  ngOnInit(){
    // TODO do not forget to unsubscribe and ; at the end of the line
    // TODO missing unsubscription
    this.isAppLoading = true;
    this.starWarsService.getShips().pipe(
      map((result)=>result.results),
    ).subscribe({
      next:(data)=>{
        this.starships = data;
      },
      complete: () => {
        this.isAppLoading = false
      }
    })
  }

  // TODO missing type void
  ShowDetails(id:string){
    this.router.navigate(['home/starships',id])
  }

  // TODO missing type void
  LoadMore(){
    // TODO missing unsubscription
    // also we may improve it if we will use BehaviorSubject and store all data in one place
    this.starWarsService.getMoreStarShips().subscribe({
      // TODO could be simplified just raw example
      //   this.starWarsService.getMoreStarShips().pipe(
      //   map(data => data.results),
      //   map(results => this.starships.push(...results))
      //   ).subscribe();
      next:(data)=>{
        for(let i=0;i<data.results.length;i++){
          this.starships.push(data.results[i])
        }
      }
    })
  }
}
