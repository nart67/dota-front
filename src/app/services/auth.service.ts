import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap, map } from 'rxjs/operators';
import { backend as API } from '../const';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AuthService {
  authenticated: Boolean;
  accessToken: string;
  userProfile: any;

  constructor(private http: HttpClient) {
    this.checkAuthentication();
  }

  checkAuthentication() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      this.accessToken = currentUser.token;
      this.authenticated = true;
    } else {
      this.authenticated = false;
    }
  }

  login(username: String, pass: String): Observable<boolean> {
    return this.http.post(API + 'login', { name: username, password: pass })
    .pipe(
      map((response: any) => {
        console.log(response);
        const token = response && response.token;
        if (token) {
          // set token property
          this.accessToken = token;

          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));

          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
      })
    );
  }
}
