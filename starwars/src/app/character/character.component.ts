import { Component, input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Router, RouterLinkActive } from '@angular/router';
import { UsersResult } from '../shared/models';

@Component({
  selector: 'app-character',
  standalone: true,
  imports: [
    MatButton,
    RouterLinkActive
  ],
  templateUrl: './character.component.html',
  styleUrl: './character.component.scss'
})
export class CharacterComponent {
  protected readonly length = length;
  character= input.required<UsersResult>();

  constructor(private  router:Router) {
  }

  openDetails(): void {
    this.router.navigate(['home/details', this.character()?.uid])
  }
}

