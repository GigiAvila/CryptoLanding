import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private cache: { [key: string]: any } = {};

  constructor() {}

  public has(key: string): boolean {
    console.log('key in has cache', key);
    return key in this.cache;
  }

  public get(key: string): any {
    const data = localStorage.getItem(key);
    const parsedData = data ? JSON.parse(data) : null;
    console.log('Datos parseados:', parsedData);
    return parsedData;
  }
  public set(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
    console.log('Datos almacenados en localStorage:', value);
    this.cache[key] = value;
  }

  public clear(): void {
    localStorage.clear();
    this.cache = {};
    console.log('LocalStorage limpiado.');
  }
}
