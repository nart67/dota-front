import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError, tap, map } from 'rxjs/operators';
import { backend as API } from '../const';
import { Subject } from 'rxjs/Subject';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AuthService {
  authenticated: Boolean;
  accessToken: string;

  public userProfile = new Subject<string>();
  public currentUser: Observable<string> = this.userProfile.asObservable();

  constructor(private http: HttpClient) {
    this.checkAuthentication();
  }

  checkAuthentication() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      this.accessToken = currentUser.token;
      this.authenticated = true;
      this.userProfile.next(currentUser.username);
    } else {
      this.authenticated = false;
    }
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post(API + 'login', { name: username, password: password })
    .pipe(
      map((response: any) => {
        const token = response && response.token;
        if (token) {
          // set token property
          this.accessToken = token;
          this.userProfile.next(username);
          this.authenticated = true;

          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));

          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
      }),
      catchError((err: HttpErrorResponse) => {
        return Observable.of(false);
      })
    );
  }

  logout() {
    this.authenticated = false;
    this.accessToken = null;
    this.userProfile.next(null);
    localStorage.removeItem('currentUser');
  }

  register(username: string, password: string): Observable<boolean> {
    return this.http.post(API + 'register', { name: username, password: password })
    .pipe(
      map((response: any) => {
        const user = response && response.user;
        if (user) {
          return true;
        } else {
          return false;
        }
      }),
      catchError((err: HttpErrorResponse) => {
        return Observable.of(false);
      })
    );
  }
}
