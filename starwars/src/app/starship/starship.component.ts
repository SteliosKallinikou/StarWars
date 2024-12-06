import {Component, inject, OnInit} from '@angular/core';
import {StarWarsService} from '../service/star-wars.service';
import {ShipResult} from '../shared/models';
import {map} from 'rxjs';
import {MatButton} from '@angular/material/button';
import {Router, RouterLinkActive} from '@angular/router';
@Component({
  selector: 'app-starship',
  standalone: true,
  imports: [
    MatButton,
    RouterLinkActive
  ],
  templateUrl: './starship.component.html',
  styleUrl: './starship.component.scss'
})
export class StarshipComponent implements OnInit{

  starWarsService = inject(StarWarsService);
  starships: ShipResult[]=[]

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.starWarsService.getShips().pipe(map((result)=>result.results)).subscribe({
      next:(data)=>{
        this.starships=data;
    }
    })

  }
  ShowDetails(id:string){
    this.router.navigate(['home/starships',id])
  }

  LoadMore(){
    this.starWarsService.getMorePlanets().subscribe({
      next:(data)=>{
        for(let i=0;i<data.results.length;i++){
          this.starships.push(data.results[i])
        }
      }
    })

  }


}
