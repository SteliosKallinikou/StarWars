import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CharacterResponse, PlanetResponse, User_PlanetResponse, UserResponse} from '../shared/models';
import {NavigationEnd, Router} from '@angular/router';

@Injectable({
  providedIn: "root"
})
export class StarWarsService {
  http = inject(HttpClient);
  URL = 'https://www.swapi.tech'
  private prevURL: string ="";
  private currURL: string="";


  constructor(http: HttpClient, private router:Router) {
    this.currURL= this.prevURL
    router.events.subscribe(event=>{
      if(event instanceof NavigationEnd){
        this.prevURL=this.currURL
        this.currURL=event.url;
      }
    })
  }

  getUsers(): Observable<UserResponse> {
    const url = `${this.URL}/api/people/`
    return this.http.get<UserResponse>(url)
  }

  getCharacterDetails(index: string | undefined): Observable<CharacterResponse>{
    const url = `${this.URL}/api/people/`+`${index}`
    return this.http.get<CharacterResponse>(url)
  }

  getPlanetDetails(index: string|undefined): Observable<PlanetResponse>{
    const url = `${this.URL}/api/planets/`+`${index}`
    return this.http.get<PlanetResponse>(url)
  }

  getPlanets(): Observable<User_PlanetResponse>{
    const url =`${this.URL}/api/planets`;
    return this.http.get<User_PlanetResponse>(url);
  }

  getPrevUrl():string{
    return this.currURL;
  }
}
