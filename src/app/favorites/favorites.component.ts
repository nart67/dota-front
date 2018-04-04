import { Favorite } from './../classes/favorite';
import { SearchService } from './../services/search.service';
import { FavoriteService } from './../services/favorite.service';
import { Hero } from '../classes/hero';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Game } from '../games/game';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit, AfterViewInit {
  heroes: Hero[] = [];
  displayedColumns = ['heroes', 'mmr', 'result', 'start', 'replay'];
  dataSource = new MatTableDataSource<Favorite>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private favoriteService: FavoriteService,
    private searchService: SearchService
  ) { }

  ngOnInit() {
    this.favoriteService.getFavorites().subscribe(favorites => {
      this.dataSource.data = favorites;
    });
    this.getHeroes();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getHeroes() {
    this.searchService.getHeroes().subscribe(heroes => {
      for (let i = 0; i < heroes.length; i++) {
        this.heroes[heroes[i].id] = heroes[i];
      }
    });
  }
}
