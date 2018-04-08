import { Favorite } from './../classes/favorite';
import { AuthService } from './../services/auth.service';
import { FavoriteService } from './../services/favorite.service';
import { Hero } from '../classes/hero';
import { SearchParams } from '../classes/searchparam';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Game } from './game';
import { SearchService } from '../services/search.service';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatCheckboxChange } from '@angular/material';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit, AfterViewInit {
  games: Game[];
  heroes: Hero[] = [];
  displayedColumns = ['heroes', 'mmr', 'result', 'start', 'replay', 'favorite'];
  dataSource = new MatTableDataSource<Game>();
  authenticated: boolean;
  favorites = new Map<string, Favorite>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private searchService: SearchService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private favoriteService: FavoriteService
  ) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      const search = new SearchParams;
      search.hero = +params.get('hero');
      if (params.get('opp')) { search.opp = +params.get('opp'); }
      if (params.get('loss')) { search.loss = +params.get('loss'); }
      if (params.get('side')) { search.side = params.get('side'); }

      this.searchService.searchGames(search).subscribe(games => {
        this.dataSource.data = games;
      });
    });
    this.getHeroes();
    this.authService.currentUser.subscribe((user) => {
      this.authenticated = !!user;
      if (this.authenticated) {
        this.getFavorites();
      }
    });
  }

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onCheck(id: string, event: MatCheckboxChange) {
    if (event.checked) {
      this.favoriteService.addFavorite(id).subscribe((res: any) => {
        if (res.favorite) {
          this.favorites.set(res.favorite.game_id, res.favorite);
        }
      });
    } else {
      this.favoriteService.deleteFavorite(this.favorites.get(id)._id)
      .subscribe();
    }
  }

  getHeroes() {
    this.searchService.getHeroes().subscribe(heroes => {
      for (let i = 0; i < heroes.length; i++) {
        this.heroes[heroes[i].id] = heroes[i];
      }
    });
  }

  getFavorites() {
    this.favoriteService.getFavorites().subscribe(favorites => {
      favorites.forEach(favorite => {
        this.favorites.set(favorite.game_id._id, favorite);
      });
    });
  }
}
