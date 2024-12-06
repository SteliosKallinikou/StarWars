import {Component, inject, input, OnInit} from '@angular/core';
import {RouterLink, Router,RouterLinkActive} from '@angular/router';
import {StarWarsService} from '../service/star-wars.service';
import {map} from 'rxjs';
import {CharacterProperties} from '../shared/models';
import {MatButton} from '@angular/material/button';



@Component({
  selector: 'app-details-component',
  standalone: true,
  imports: [
    RouterLink,
    MatButton,
    RouterLinkActive,
  ],
  templateUrl: './details-component.component.html',
  styleUrl: './details-component.component.scss'
})
export class DetailsComponentComponent implements OnInit {
  uid = input<string>()
  starWarsService = inject(StarWarsService);
  details: CharacterProperties | undefined
  p_id: string|undefined


  ngOnInit():void {
    this.starWarsService.getCharacterDetails(this.uid()).pipe(map((properties)=> properties.result)).subscribe({
      next: (data)=>{
        this.details =(data.properties)
        this.p_id= this.details?.homeworld.substring(35)
      }
    })
  }
  constructor(private router: Router) {
  }
  OpenHome(id:string|undefined):void{
    this.router.navigate(['planets',id])
  }
}
