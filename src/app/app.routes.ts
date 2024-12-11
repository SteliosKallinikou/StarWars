import { Routes } from '@angular/router';
import { CharactersComponent } from './characters/characters.component';
import { PlanetsComponent } from './planets/planets.component';
import { StarShipsComponent } from './star-ships/star-ships.component';
import { StarShipDetailsComponent } from './star-ships/star-ship-details/star-ship-details.component';
import { CharacterDetailsComponent } from './characters/characters-details/character-details.component';
import { RouterLinks } from './shared/enums';
import { PlanetDetailsComponent } from './planets/planet-details/planet-details.component';

export const routes: Routes = [
  {
    path: RouterLinks.CHARACTERS,
    children: [
      {
        path: '',
        component: CharactersComponent,
      },
      {
        path: ':id',
        component: CharacterDetailsComponent,
      },
    ],
  },
  {
    path: RouterLinks.PLANETS,
    children: [
      {
        path: '',
        component: PlanetsComponent,
      },
      {
        path: ':id',
        component: PlanetDetailsComponent,
      },
    ],
  },
  {
    path: RouterLinks.STAR_SHIPS,
    children: [
      {
        path: '',
        component: StarShipsComponent,
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
    redirectTo: RouterLinks.CHARACTERS,
  },
  {
    path: '**',
    redirectTo: RouterLinks.CHARACTERS,
  },
];
