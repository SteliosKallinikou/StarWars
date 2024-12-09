// TODO spacing
import { Routes } from '@angular/router';
import { CharactersComponent } from './characters/characters.component';
import { PlanetComponent } from './planet/planet.component';
import { StarShipComponent } from './star-ship/star-ship.component';
import { PlanetViewComponent } from './planet/planet-view/planet-view.component';
import { StarShipDetailsComponent } from './star-ship/star-ship-details/star-ship-details.component';
import { CharacterDetailsComponent } from './characters/characters-details/character-details.component';

export const routes: Routes = [
  {
    path: 'characters',
    children: [
      {
        path: '',
        component: CharactersComponent,
      },
      {
        path: ':uid',
        component: CharacterDetailsComponent,
      },
    ],
  },
  {
    path: 'planets',
    children: [
      {
        path: '',
        component: PlanetViewComponent,
      },
      {
        path: ':id',
        component: PlanetComponent,
      },
    ],
  },
  {
    path: 'starships',
    children: [
      {
        path: '',
        component: StarShipComponent,
      },
      {
        path: ':id',
        component: StarShipDetailsComponent,
      },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'characters',
  },
  {
    path: '**',
    redirectTo: 'characters',
  },
];
