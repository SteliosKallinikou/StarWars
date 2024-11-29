import { Routes } from '@angular/router';
import {DetailsComponentComponent} from './details-component/details-component.component';
import {AppCharactersComponent} from './app-characters/app-characters.component';
import {HomeComponent} from './home/home.component';


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
    path: '**',
    redirectTo: 'home'
  },
]
