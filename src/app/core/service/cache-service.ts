import { Injectable } from '@angular/core';
import { DEFAULT_CACHE } from '../../shared/consts/default-cache';
import { AppStore } from '../../shared/models';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private appStore: AppStore = DEFAULT_CACHE;

  getFromCache<T extends keyof AppStore>(key: T): AppStore[T] {
    return this.appStore[key];
  }

  setInCache<K extends keyof AppStore>(key: K, data: AppStore[K]): void {
    this.appStore[key] = data;
  }
}
