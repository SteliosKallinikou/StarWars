import { Component, input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Router, RouterLinkActive } from '@angular/router';
import { UsersResult } from '../../shared/models';

// TODO We can make it as a shared component and reuse it
// We could have 2 inputs "displayName" and "navigationUrl"
@Component({
  selector: 'app-character-card',
  standalone: true,
  imports: [MatButton, RouterLinkActive],
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.scss',
})
export class CharacterCardComponent {
  protected readonly length = length;
  character = input.required<UsersResult>();

  constructor(private router: Router) {}

  openDetails(): void {
    this.router.navigate(['/characters', this.character()?.uid]);
  }
}
