import {Component, input} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {Router, RouterLinkActive} from '@angular/router';
import {UsersResult} from '../shared/models';


@Component({
  selector: 'app-app-characters',
  standalone: true,
  imports: [
    MatButton,
    RouterLinkActive
  ],
  templateUrl: './app-characters.component.html',
  styleUrl: './app-characters.component.scss'
})
export class AppCharactersComponent {
  character= input.required<UsersResult>();
  protected readonly length = length;

    constructor(private  router:Router) {
    }

    openDetails(): void {
      this.router.navigate(['home/details',this.character()?.uid])
  }

}

