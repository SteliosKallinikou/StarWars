import {Component, inject, OnInit} from '@angular/core';
import {StarWarsService} from '../service/star-wars.service';
import { PlanetResult} from '../shared/models';
import {map} from 'rxjs';
import {MatButton} from '@angular/material/button';
import {Router, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-planet-view',
  standalone: true,
  imports: [
    MatButton,
    RouterLinkActive
  ],
  templateUrl: './planet-view.component.html',
  styleUrl: './planet-view.component.scss'
})
export class PlanetViewComponent implements OnInit{
  starWarsService = inject(StarWarsService);
  planets: PlanetResult[]=[]


constructor(private router: Router) {
}
  ngOnInit() {
    this.starWarsService.getPlanets().pipe(map((result) => result.results)
    ).subscribe({
      next:(data=>{
        this.planets= data
      })
    })
  }

  Details(id:string){
    this.router.navigate(['planets',id])
  }

}
