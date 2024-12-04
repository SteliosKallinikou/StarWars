import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import { MatTabLink, MatTabNav, MatTabNavPanel} from '@angular/material/tabs';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatTabNav,
    MatTabLink,
    MatTabNavPanel
  ],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent {


}
