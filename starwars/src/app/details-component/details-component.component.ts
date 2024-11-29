import {Component, inject, input, OnInit} from '@angular/core';
import {RouterLink, Router, ActivatedRoute} from '@angular/router';
import {StarWarsService} from '../service/star-wars.service';
import {map} from 'rxjs';
import {JsonPipe} from '@angular/common';
import {Properties} from '../shared/models';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-details-component',
  standalone: true,
  imports: [
    RouterLink,
    JsonPipe,
    MatButton
  ],
  templateUrl: './details-component.component.html',
  styleUrl: './details-component.component.scss'
})
export class DetailsComponentComponent implements OnInit {
  uid = input<string>()
  starWarsService = inject(StarWarsService);
  details: Properties | undefined



  ngOnInit():void {
    this.starWarsService.getDetails(this.uid()).pipe(map((propertie)=> propertie.result)).subscribe({
      next: (data)=>{
        console.log(data.properties.name)
        this.details =(data.properties)
      }
    })
  }
}
