import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, tap } from 'rxjs';
import { CacheService } from './cache-service';
import {
  CharacterDetailsResponse,
  CharactersResponse,
  PlanetDetailsResponse,
  PlanetsResponse,
  ShipDetailsResponse,
  ShipsResponse,
} from '../../shared/models';

@Injectable({
  providedIn: 'root',
})
export class StarWarsService {
  private readonly URL = 'https://www.swapi.tech';

  http = inject(HttpClient);
  cacheService = inject(CacheService);

  getCharacters(): Observable<CharactersResponse> {
    const url = `${this.URL}/api/people/`;
    const cache = this.cacheService.getFromCache('characters');

    if (cache) {
      return of(cache);
    }

    return this.http.get<CharactersResponse>(url).pipe(
      tap(data => {
        this.cacheService.setInCache('characters', data);
      })
    );
  }

  getMoreCharacters(): Observable<CharactersResponse> {
    const cache = this.cacheService.getFromCache('characters');
    const url = cache?.next;

    if (!url) {
      return of(cache);
    }

    return this.http.get<CharactersResponse>(url).pipe(
      map(response => {
        const data = {
          ...response,
          results: [...cache.results, ...response.results],
        };
        this.cacheService.setInCache('characters', data);

        return data;
      })
    );
  }

  getCharacterDetails(index: string | undefined): Observable<CharacterDetailsResponse> {
    const cache = this.cacheService.getFromCache('charactersDetails');
    const url = `${this.URL}/api/people/` + `${index}`;

    if (cache?.result?.uid === index) {
      return of(cache);
    }

    return this.http.get<CharacterDetailsResponse>(url).pipe(
      tap(data => {
        this.cacheService.setInCache('charactersDetails', data);
      })
    );
  }

  getPlanetDetails(index: string | undefined): Observable<PlanetDetailsResponse> {
    const cache = this.cacheService.getFromCache('planetsDetails');
    const url = `${this.URL}/api/planets/` + `${index}`;

    if (cache?.result?.uid === index) {
      return of(cache);
    }

    return this.http.get<PlanetDetailsResponse>(url).pipe(
      tap(data => {
        this.cacheService.setInCache('planetsDetails', data);
      })
    );
  }

  getPlanets(): Observable<PlanetsResponse> {
    const cache = this.cacheService.getFromCache('planets');
    const url = `${this.URL}/api/planets`;

    if (cache) {
      return of(cache);
    }

    return this.http.get<PlanetsResponse>(url).pipe(
      tap(data => {
        this.cacheService.setInCache('planets', data);
      })
    );
  }

  getMorePlanets(): Observable<PlanetsResponse> {
    const cache = this.cacheService.getFromCache('planets');
    const url = cache?.next;

    if (!url) {
      return of(cache);
    }

    return this.http.get<PlanetsResponse>(url).pipe(
      map(response => {
        const data = {
          ...response,
          results: [...cache.results, ...response.results],
        };
        this.cacheService.setInCache('planets', data);

        return data;
      })
    );
  }

  getShips(): Observable<ShipsResponse> {
    const cache = this.cacheService.getFromCache('ships');
    const url = `${this.URL}/api/starships`;

    if (cache) {
      return of(cache);
    }

    return this.http.get<ShipsResponse>(url).pipe(
      tap(data => {
        this.cacheService.setInCache('ships', data);
      })
    );
  }

  getShipDetails(index: string | undefined): Observable<ShipDetailsResponse> {
    const cache = this.cacheService.getFromCache('shipsDetails');
    const url = `${this.URL}/api/starships/` + `${index}`;

    if (cache?.result?.uid === index) {
      return of(cache);
    }

    return this.http.get<ShipDetailsResponse>(url).pipe(
      tap(data => {
        this.cacheService.setInCache('shipsDetails', data);
      })
    );
  }

  getMoreStarShips(): Observable<ShipsResponse> {
    const cache = this.cacheService.getFromCache('ships');
    const url = cache?.next;

    if (!url) {
      return of(cache);
    }

    return this.http.get<ShipsResponse>(url).pipe(
      map(response => {
        const data = {
          ...response,
          results: [...cache.results, ...response.results],
        };
        this.cacheService.setInCache('ships', data);

        return data;
      })
    );
  }
}
