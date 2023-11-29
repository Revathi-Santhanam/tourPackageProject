import { Injectable } from '@angular/core';
import { AppUser } from '../model/appUser';
import { Category } from '../model/category';
import { Tour } from '../model/tour';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
 
  constructor() {}

  setLoggedInUser(user: AppUser): void {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
  }

  public getLoggedInUser(): AppUser {
    return JSON.parse(localStorage.getItem('loggedInUser') || '{}');
  }

  public removeLoggedInUser(): void {
    localStorage.removeItem('loggedInUser');
  }
  
  public setRoute(route: string | null): void {
    if (route !== null) localStorage.setItem("route", route);
  }

  public getRoute(): string | null {
    return localStorage.getItem("route");
  }

  public removeRoute(): void {
    localStorage.removeItem("route");
  }

  setAuthData(authData: string) {
    localStorage.setItem("authData", authData);
  }

  public getAuthData(): string | null {
    return localStorage.getItem("authData");
  }
  
  public removeAuthData(): void {
    localStorage.removeItem("authData");
  }
  setCategory(category: Category): void {
    localStorage.setItem('Category', JSON.stringify(category));
  }

  public getCategory(): Category {
    return JSON.parse(localStorage.getItem('Category') || '{}');
  }

  public removeCategory(): void {
    localStorage.removeItem('Category');
  }
  
}
