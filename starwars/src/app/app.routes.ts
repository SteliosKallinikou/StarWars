// TODO spacing
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlanetComponent } from './planet/planet.component';
import { StarShipComponent } from './star-ship/star-ship.component';
import { DetailsCardComponent } from './details-card/details-card.component';
import { PlanetViewComponent } from './planet/planet-view/planet-view.component';
import { StarShipDetailsComponent } from './star-ship/star-ship-details/star-ship-details.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'home/details/:uid',
    component: DetailsCardComponent,
  },
  {
    path: 'home/planets/:id',
    component: PlanetComponent,
  },
  {
    path: 'home/planets',
    component: PlanetViewComponent,
  },
  {
    path: 'home/starships',
    component: StarShipComponent,
  },
  {
    path: 'home/starships/:id',
    component: StarShipDetailsComponent,
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
