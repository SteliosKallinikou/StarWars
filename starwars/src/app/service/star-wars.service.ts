import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CharacterResponse, UserResponse, UsersResult} from '../shared/models';

@Injectable({
  providedIn: "root"
})
export class StarWarsService {
  http = inject(HttpClient);
  URL = 'https://www.swapi.tech'

  constructor(http: HttpClient) {
  }

  getUsers(): Observable<UserResponse> {
    const url = `${this.URL}/api/people/`
    return this.http.get<UserResponse>(url)
  }

  getDetails(index: string | undefined): Observable<CharacterResponse>{
    const url = `${this.URL}/api/people/`+`${index}`
    return this.http.get<CharacterResponse>(url)
  }

  getPlanets(): Observable<any>{
    const url =`${this.URL}/api/planets`;
    return this.http.get<any>(url);
  }
}
