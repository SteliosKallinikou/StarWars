import {Component, inject, input, OnInit} from '@angular/core';
import {RouterLink, Router, RouterLinkActive} from '@angular/router';
import {StarWarsService} from '../core/service';
import {map} from 'rxjs';
import {CharacterProperties} from '../shared/models';
import {MatButton} from '@angular/material/button';
import {Location} from '@angular/common';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-details-card',
  standalone: true,
  imports: [
    RouterLink,
    MatButton,
    RouterLinkActive,
    MatProgressSpinner,
  ],
  templateUrl: './details-card.component.html',
  styleUrl: './details-card.component.scss'
})
export class DetailsCardComponent implements OnInit {
  uid = input<string>()
  starWarsService = inject(StarWarsService);
  details: CharacterProperties | undefined
  p_id: string | undefined
  isApploading = false
  currURL: string= this.starWarsService.getPrevUrl()


  ngOnInit(): void {
    this.isApploading=true
    this.starWarsService.getCharacterDetails(this.uid()).pipe(map((properties) => properties.result)).subscribe({
      next: (data) => {
        this.details = (data.properties)
        this.p_id = this.details?.homeworld.substring(35)
      },
      complete: () => {
        this.isApploading = false
      }
    })
  }

  constructor(private router: Router, private location: Location) {
    this.currURL = this.location.path()
  }

  OpenHome(id: string | undefined): void {
    this.router.navigate(['home/planets', id])
  }
}
