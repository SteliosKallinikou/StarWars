import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { CharacterResponse, PlanetResponse, ShipResponse, User_PlanetResponse, User_ShipResponse, UserResponse } from '../../shared/models';
import { NavigationEnd, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class StarWarsService {
  http = inject(HttpClient);
  // TODO Could be -> private readonly URL
  URL = 'https://www.swapi.tech';

  private prevURL: string = '';
  private currURL: string = '';
  // TODO not the best idea use any
  private cache: { [key: string]: any } = {};

  // TODO no need a type in case it evident
  // In TypeScript, if the type can be inferred from the assigned value, you don't need to explicitly specify the type.
  // In this case, since 0 is a number, TypeScript can infer that UserPageCount is of type number.
  // Therefore, you can simplify the declaration as follows: UserPageCount = 0;
  UserPageCount: number = 0;
  //TODO camelCase
  Userlimit: boolean = false;
  UsernextUrl: string = '';

  PlanetPageCount: number = 0;
  //TODO camelCase
  Planetlimit: boolean = false;
  PlanetnextUrl: string = '';

  StarPageCount: number = 0;
  //TODO camelCase
  Starlimit: boolean = false;
  StarnextUrl: string = '';

  //TODO not the best idea use private readonly router:Router here
  // we previously discussed better approach
  constructor(private readonly router: Router) {
    this.currURL = this.prevURL;
    router.events
      .pipe(
        tap(() => {}),
        takeUntilDestroyed()
      )
      .subscribe({
        next: event => {
          if (event instanceof NavigationEnd) {
            this.prevURL = this.currURL;
            this.currURL = event.url;
          }
        },
      });
  }

  getUsers(): Observable<UserResponse> {
    const url = `${this.URL}/api/people/`;
    if (this.cache[url]) {
      return of(this.cache[url]);
    }
    return this.http.get<UserResponse>(url).pipe(
      tap(data => {
        this.cache[url] = data;
        // TODO no need console log in finale code
        console.log(data);
        this.UsernextUrl = this.cache[url].next;
      })
    );
  }

  getMoreUsers(): Observable<UserResponse> {
    const url = `${this.URL}/api/people/`;
    if (this.UserPageCount === this.cache[url].total_pages - 2) {
      this.Userlimit = true;
      return this.http.get<UserResponse>(this.UsernextUrl);
    }

    this.UserPageCount++;
    return this.http.get<UserResponse>(this.UsernextUrl).pipe(
      tap(data => {
        // TODO no need console log in finale code
        console.log(data);
        this.cache[this.UsernextUrl] = data;
        this.UsernextUrl = data.next;
      })
    );
  }

  getCharacterDetails(index: string | undefined): Observable<CharacterResponse> {
    const url = `${this.URL}/api/people/` + `${index}`;
    if (this.cache[url]) {
      return of(this.cache[url]);
    }
    return this.http.get<CharacterResponse>(url).pipe(
      tap(data => {
        this.cache[url] = data;
      })
    );
  }

  getPlanetDetails(index: string | undefined): Observable<PlanetResponse> {
    const url = `${this.URL}/api/planets/` + `${index}`;
    if (this.cache[url]) {
      return of(this.cache[url]);
    }
    return this.http.get<PlanetResponse>(url).pipe(
      tap(data => {
        this.cache[url] = data;
      })
    );
  }

  getPlanets(): Observable<User_PlanetResponse> {
    const url = `${this.URL}/api/planets`;
    if (this.cache[url]) {
      return of(this.cache[url]);
    }
    return this.http.get<User_PlanetResponse>(url).pipe(
      tap(data => {
        this.cache[url] = data;
        this.PlanetnextUrl = this.cache[url].next;
      })
    );
  }

  getMorePlanets(): Observable<User_PlanetResponse> {
    const url = `${this.URL}/api/planets`;
    if (this.PlanetPageCount === this.cache[url].total_pages - 2) {
      this.Planetlimit = true;
      this.cache[this.PlanetnextUrl].limit = true;
      return this.http.get<User_PlanetResponse>(this.PlanetnextUrl);
    }

    this.PlanetPageCount++;
    return this.http.get<User_PlanetResponse>(this.PlanetnextUrl).pipe(
      tap(data => {
        console.log(data);
        this.cache[this.PlanetnextUrl] = data;
        this.PlanetnextUrl = data.next;
      })
    );
  }

  getShips(): Observable<User_ShipResponse> {
    const url = `${this.URL}/api/starships`;
    if (this.cache[url]) {
      return of(this.cache[url]);
    }
    return this.http.get<User_ShipResponse>(url).pipe(
      tap(data => {
        this.cache[url] = data;
        this.StarnextUrl = data.next;
      })
    );
  }

  getShipDetails(index: string | undefined): Observable<ShipResponse> {
    const url = `${this.URL}/api/starships/` + `${index}`;
    if (this.cache[url]) {
      return of(this.cache[url]);
    }
    return this.http.get<ShipResponse>(url).pipe(
      tap(data => {
        this.cache[url] = data;
      })
    );
  }

  getMoreStarShips(): Observable<User_ShipResponse> {
    const url = `${this.URL}/api/starships`;
    if (this.StarPageCount === this.cache[url].total_pages - 2) {
      this.Starlimit = true;
      return this.http.get<User_ShipResponse>(this.StarnextUrl);
    }
    this.StarPageCount++;
    return this.http.get<User_ShipResponse>(this.StarnextUrl).pipe(
      tap(data => {
        this.cache[this.StarnextUrl] = data;
        this.StarnextUrl = data.next;
      })
    );
  }
  // TODO could be a getter
  // example get prevUrl(): string {
  //   return this.currURL;
  // }
  getPrevUrl(): string {
    return this.currURL;
  }

  // TODO could be a getter
  getUserLimit(): boolean {
    return this.Userlimit;
  }
  // TODO could be a getter
  getPlanetLimit(): boolean {
    return this.Planetlimit;
  }
  // TODO could be a getter
  getShipLimit(): boolean {
    return this.Starlimit;
  }
}
