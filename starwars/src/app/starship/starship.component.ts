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
export class StarshipComponent implements OnInit{
  starWarsService = inject(StarWarsService);
  starships: ShipResult[] = [];
  isApploading = false

  constructor(private router: Router) {

  }

  ngOnInit(){
    this.isApploading=true
    this.starWarsService.getShips().pipe(
      map((result)=>result.results),
    ).subscribe({
      next:(data)=>{
        this.starships=data;
      },
      complete: () => {
        this.isApploading = false
      }
    })

  }

  ShowDetails(id:string){
    this.router.navigate(['home/starships',id])
  }

  LoadMore(){
    this.starWarsService.getMoreStarShips().subscribe({
      next:(data)=>{
        for(let i=0;i<data.results.length;i++){
          this.starships.push(data.results[i])
        }
      }
    })

  }

}
