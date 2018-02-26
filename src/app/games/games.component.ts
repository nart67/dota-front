import { Hero } from './../hero';
import { SearchParams } from './../param';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Game } from './game';
import { SearchService } from '../search.service';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit, AfterViewInit {
  games: Game[];
  heroes: Hero[] = [];
  displayedColumns = ['heroes', 'mmr', 'result', 'start', 'replay'];
  dataSource = new MatTableDataSource<Game>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private searchService: SearchService,
    private route: ActivatedRoute
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
  }

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
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
