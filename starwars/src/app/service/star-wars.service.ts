import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, of, tap} from 'rxjs';
import {
  CharacterResponse,
  PlanetResponse,
  ShipResponse,
  User_PlanetResponse,
  User_ShipResponse,
  UserResponse
} from '../shared/models';
import {NavigationEnd, Router} from '@angular/router';

@Injectable({
  providedIn: "root"
})
export class StarWarsService {
  http = inject(HttpClient);
  URL = 'https://www.swapi.tech'
  private prevURL: string ="";
  private currURL: string="";
  private cache: { [key: string]: any } = {};


  constructor(http: HttpClient ,private router:Router) {
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
    if(this.cache[url]){
      return of (this.cache[url])
    }
    return this.http.get<UserResponse>(url).pipe(tap((data=>{
      this.cache[url]=data
    })))
  }

  getCharacterDetails(index: string | undefined): Observable<CharacterResponse>{
    const url = `${this.URL}/api/people/`+`${index}`
    if(this.cache[url]){
      return of (this.cache[url])
    }
    return this.http.get<CharacterResponse>(url).pipe(tap((data=>{
      this.cache[url]=data
    })))
  }

  getPlanetDetails(index: string|undefined): Observable<PlanetResponse>{
    const url = `${this.URL}/api/planets/`+`${index}`
    if(this.cache[url]){
      return of (this.cache[url])
    }
    return this.http.get<PlanetResponse>(url).pipe(tap((data=>{
      this.cache[url]=data
    })))
  }

  getPlanets(): Observable<User_PlanetResponse>{
    const url =`${this.URL}/api/planets`;
    if(this.cache[url]){
      return of (this.cache[url])
    }
    return this.http.get<User_PlanetResponse>(url).pipe(tap((data=>{
      this.cache[url]=data
    })))
  }

  getShips(): Observable<User_ShipResponse>{
    const url = `${this.URL}/api/starships`;
    if(this.cache[url]){
      return of (this.cache[url])
    }
    return this.http.get<User_ShipResponse>(url).pipe(tap((data=>{
      this.cache[url]=data
    })))
  }

  getShipDetails(index: string|undefined):Observable<ShipResponse>{
    const url = `${this.URL}/api/starships/`+`${index}`;
    if(this.cache[url]){
      return of (this.cache[url])
    }
    return this.http.get<ShipResponse>(url).pipe(tap((data=>{
      this.cache[url]=data
    })))
  }

  getPrevUrl():string{
    return this.currURL;
  }
}
