import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MatTab, MatTabGroup} from '@angular/material/tabs';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [
    RouterOutlet,
    MatTab,
    MatTabGroup
  ],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent {

}
