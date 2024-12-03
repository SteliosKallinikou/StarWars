import { Routes } from '@angular/router';
import {DetailsComponentComponent} from './details-component/details-component.component';
import {HomeComponent} from './home/home.component';
import {PlanetComponent} from './planet/planet.component';
import {PlanetViewComponent} from './planet-view/planet-view.component';
import {StarshipComponent} from './starship/starship.component';
import {StarshipDetailsComponent} from './starship-details/starship-details.component';


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
    path: 'details/:uid',
    component: DetailsComponentComponent
  },
  {
    path: 'planets/:id',
    component: PlanetComponent
  },
  {
    path:'planets',
    component: PlanetViewComponent
  },
  {
    path:'starships',
    component: StarshipComponent
  },
  {
    path: 'starships/:id',
    component: StarshipDetailsComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  },
]
