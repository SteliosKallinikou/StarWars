import {Component} from '@angular/core';
import { TopBarComponent } from './top-bar/top-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TopBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title: "starwars" | undefined;

}
