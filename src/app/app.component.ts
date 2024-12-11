import { Component } from '@angular/core';
import { TopBarComponent } from './core/components';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TopBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
