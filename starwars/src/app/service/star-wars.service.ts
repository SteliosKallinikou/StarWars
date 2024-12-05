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
  nextUrl:string=""
  private prevURL: string ="";
  private currURL: string="";
  private cache: { [key: string]: any } = {};
  UserPageCount:number=0
  Userlimit: boolean=false
  PlanetPageCount:number=0
  Planetlimit: boolean=false
  StarPageCount:number=0
  Starlimit: boolean=false



  constructor(private readonly router:Router) {
    this.currURL= this.prevURL
    router.events.pipe(tap(()=>{
    })).subscribe({
      next:(event)=>{
          if(event instanceof NavigationEnd){
            this.prevURL=this.currURL
            this.currURL=event.url;
          }
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
      console.log(data)
      this.nextUrl= this.cache[url].next
    })))
  }

  getMoreUsers(): Observable<UserResponse> {
    const url = `${this.URL}/api/people/`
    if(this.UserPageCount===this.cache[url].total_pages-2){
      this.Userlimit=true
      return this.http.get<UserResponse>(this.nextUrl)
    }

    this.UserPageCount++
    return this.http.get<UserResponse>(this.nextUrl).pipe(tap((data=>{
      this.cache[this.nextUrl]=data
      this.nextUrl= data.next
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
      this.nextUrl= this.cache[url].next
    })))
  }

  getMorePlanets():Observable<User_PlanetResponse>{
    const url = `${this.URL}/api/planets`
    if(this.PlanetPageCount===this.cache[url].total_pages-2){
      this.Planetlimit=true
      this.cache[this.nextUrl].limit=true
      return this.http.get<User_PlanetResponse>(this.nextUrl)
    }

    this.PlanetPageCount++
    return this.http.get<User_PlanetResponse>(this.nextUrl).pipe(tap((data=>{
      console.log(data)
      this.cache[this.nextUrl]=data
      this.nextUrl= data.next
    })))

  }


  getShips(): Observable<User_ShipResponse>{
    const url = `${this.URL}/api/starships`;
    if(this.cache[url]){
      return of (this.cache[url])
    }
    return this.http.get<User_ShipResponse>(url).pipe(tap((data=>{
      this.cache[url]=data
      this.nextUrl= data.next
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

  getMoreStarShips():Observable<User_ShipResponse>{
    const url = `${this.URL}/api/starships`
    if(this.StarPageCount===this.cache[url].total_pages-2){
      this.Starlimit=true
      return this.http.get<User_ShipResponse>(this.nextUrl)
    }
    this.StarPageCount++
    return this.http.get<User_ShipResponse>(this.nextUrl).pipe(tap((data=>{
      this.cache[this.nextUrl]=data
      this.nextUrl= data.next
    })))

  }
  getPrevUrl():string{
    return this.currURL;
  }

  getUserLimit():boolean{
    return this.Userlimit
  }
  getPlanetLimit():boolean{
    return this.Planetlimit
  }
  getShipLimit():boolean{
    return this.Starlimit
  }
}
