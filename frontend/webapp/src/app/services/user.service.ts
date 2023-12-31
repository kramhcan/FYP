import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/users.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserData } from '../models/user_datas.model';
import { CombinedModel } from '../models/combined.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly ROOT_URL = 'http://localhost:3000/';
  private userSubject = new BehaviorSubject<User | null>(null); 
  private userData = new BehaviorSubject<CombinedModel | null>(null); 
  private userEmail: string | null = null;
  private localStorageKey = 'user';
  private localStorageKey2 = 'userData';

  constructor(
    private apiService: ApiService,
    private http: HttpClient,
    private router: Router
  ) { }

  //set the user
  setUser(user: any) {
    this.userSubject.next(user);
    console.log("setUser: " + JSON.stringify(user));
    if(user && user.email) {
      this.userEmail = user.email;
      localStorage.setItem(this.localStorageKey, JSON.stringify(user));
      this.requestUserData();
    }
  }

  //set the user data
  setUserData(userData: any) {
    this.userData.next(userData);
    console.log("setUserData: " + JSON.stringify(userData));
    localStorage.setItem(this.localStorageKey2, JSON.stringify(userData));
    this.router.navigate(['/dashboard']);
  }

  requestUserData() {
    if (this.userEmail) {
      console.log("HERERERERE")
      const params = new HttpParams().set('email', this.userEmail);
      this.apiService.get(this.ROOT_URL + 'user_data/view', params).subscribe(
      res => {
        console.log(res);
        this.setUserData(res);
      },
      err => {
        console.log(err);
      }
      );
    }
  }

  //For components
  getUserData(): Observable<string | null> {
    console.log("GETUSERDATAHERE: " + localStorage.getItem(this.localStorageKey2));
    return of(localStorage.getItem(this.localStorageKey2));
  }

  getUser() : Observable<string | null> {
    return of(localStorage.getItem(this.localStorageKey));
  }

  updateLocalUserData(email: any) {
    const params = new HttpParams().set('email', email);
    if (email) {
      this.apiService.get(this.ROOT_URL + 'user_data/view', params).subscribe(
      res => {
        console.log(res);
        this.setUserData(res);
      },
      err => {
        console.log(err);
      }
      );
    }
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.ROOT_URL}user/login`, credentials).pipe(
      tap((res: any) => {
        if (res && res.user) {
          this.setUser(res.user);
          this.router.navigate(['/dashboard']);
        }
      })
    );
  }

  logout(): void {
    this.setUser(null);
    this.setUserData(null);
    localStorage.removeItem(this.localStorageKey);
    localStorage.removeItem(this.localStorageKey2);
    this.router.navigate(['/login']);
  }
  
}
