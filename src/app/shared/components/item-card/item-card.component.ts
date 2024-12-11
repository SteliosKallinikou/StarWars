import { Component, inject, input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Router, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-item-card',
  standalone: true,
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.scss',
  imports: [MatButton, RouterLinkActive],
})
export class ItemCardComponent {
  private readonly router = inject(Router);

  id = input.required<string>();
  displayName = input.required<string>();
  navigateTo = input.required<string>();

  onDetailsClick(): void {
    this.router.navigate([`/${this.navigateTo()}`, this.id()]);
  }
}
