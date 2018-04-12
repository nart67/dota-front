import { BreakpointObserver } from '@angular/cdk/layout';
import { Favorite } from './../classes/favorite';
import { SearchService } from './../services/search.service';
import { FavoriteService } from './../services/favorite.service';
import { Hero } from '../classes/hero';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Game } from '../games/game';
import { MatPaginator, MatTableDataSource, MatTable } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit, AfterViewInit {
  heroes: Hero[] = [];
  dataSource = new MatTableDataSource<Favorite>();

  webColumns = ['heroes', 'mmr', 'result', 'start', 'replay', 'delete'];
  mobileColumns = ['mobile'];
  displayedColumns: Array<string>;
  isMobile: boolean;
  loaded: boolean;

  @ViewChild('MatPaginator') paginator: MatPaginator;

  constructor(
    private favoriteService: FavoriteService,
    private searchService: SearchService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.breakpointObserver.observe('(max-width: 1000px)').subscribe((state) => {
      if (state.matches) {
        this.displayedColumns = this.mobileColumns;
        this.isMobile = true;
      } else {
        this.displayedColumns = this.webColumns;
        this.isMobile = false;
      }
    });
  }

  ngOnInit() {
    this.loaded = false;
    this.favoriteService.getFavorites().subscribe(favorites => {
      this.dataSource.data = favorites;
      this.loaded = true;
    });
    this.getHeroes();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  delete(favorite_id: string, i: number) {
    this.favoriteService.deleteFavorite(favorite_id).subscribe(() => {
      console.log('test');
      this.dataSource.data.splice(i, 1);

      // Weird workaround to refresh the table
      // calling renderRows() on table does not seem to work
      this.dataSource.paginator = this.paginator;
    });
  }

  getHeroes() {
    this.searchService.getHeroes().subscribe(heroes => {
      for (let i = 0; i < heroes.length; i++) {
        this.heroes[heroes[i].id] = heroes[i];
      }
    });
  }
}
