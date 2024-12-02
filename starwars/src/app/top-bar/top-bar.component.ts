import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatTab, MatTabLink, MatTabNav} from '@angular/material/tabs';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [
    RouterOutlet,
    MatTab,
    RouterLink,
    RouterLinkActive,
    MatTabNav,
    MatTabLink
  ],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent {

}
