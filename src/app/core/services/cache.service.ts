import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private cache: { [key: string]: any } = {};

  constructor() {}

  public has(key: string): boolean {
    return key in this.cache;
  }

  public get(key: string): any {
    const data = localStorage.getItem(key);
    const parsedData = data ? JSON.parse(data) : null;
    return parsedData;
  }
  public set(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));

    this.cache[key] = value;
  }
}
