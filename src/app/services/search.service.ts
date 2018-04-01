import { SearchParams } from '../classes/searchparam';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';
import { Game } from '../games/game';
import { Hero } from '../classes/hero';
import { backend as API } from '../const';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class SearchService {
  private dataSubject = new ReplaySubject<Hero[]>(1);
  heroes: Observable<Hero[]> = this.dataSubject.asObservable();
  fetched: Boolean = false;

  constructor(private http: HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    if (!this.fetched) {
      this.http.get<Hero[]>(API + 'heroes/').subscribe(res => this.dataSubject.next(res));
      this.fetched = true;
    }
    return this.heroes;
  }

  searchGames(params: SearchParams): Observable<Game[]> {
    const url = new URLSearchParams();
    for (const key of Object.keys(params)) {
        url.set(key, params[key]);
    }

    return this.http.get<Game[]>(API + `search/?` + url.toString()).pipe(
      // tap(_ => this.log(`found heroes matching "${hero}"`)),
      // catchError(this.handleError<Game[]>('searchGames', []))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
//   private handleError<T> (operation = 'operation', result?: T) {
//     return (error: any): Observable<T> => {

//       // TODO: send the error to remote logging infrastructure
//       console.error(error); // log to console instead

//       // TODO: better job of transforming error for user consumption
//       // this.log(`${operation} failed: ${error.message}`);

//       // Let the app keep running by returning an empty result.
//       return of(result as T);
//     };
//   }
}
