// TODO spacing
import { Routes } from '@angular/router';
import { DetailsComponentComponent } from './details-component/details-component.component';
import { HomeComponent } from './home/home.component';
import { PlanetComponent } from './planet/planet.component';
import { PlanetViewComponent } from './planet-view/planet-view.component';
import { StarshipComponent } from './starship/starship.component';
import { StarshipDetailsComponent } from './starship-details/starship-details.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: "full",
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'home/details/:uid',
    component: DetailsComponentComponent
  },
  {
    path: 'home/planets/:id',
    component: PlanetComponent
  },
  {
    path:'home/planets',
    component: PlanetViewComponent
  },
  {
    path:'home/starships',
    component: StarshipComponent
  },
  {
    path: 'home/starships/:id',
    component: StarshipDetailsComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  },
]
