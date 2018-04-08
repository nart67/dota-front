import { Favorite } from './../classes/favorite';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';
import { backend as API } from '../const';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class FavoriteService {

  constructor(private http: HttpClient) { }

  getFavorites(): Observable<Favorite[]> {
    return this.http.get<Favorite[]>(API + 'favorites');
  }

  updateFavorite(favorite_id: string, comment: string) {
    const update = { comment: comment };
    return this.http.put(API + 'favorites/' + favorite_id, { favorite: update });
  }

  deleteFavorite(favorite_id: string) {
    return this.http.delete(API + 'favorites/' + favorite_id);
  }

  addFavorite(game_id: string, comment?: string) {
    return this.http.post(API + 'favorites', {game_id: game_id, comment: comment});
  }

}
