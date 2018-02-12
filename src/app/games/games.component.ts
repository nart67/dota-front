import { Component, OnInit } from '@angular/core';
import { Game } from './game';
import { SearchService } from '../search.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  games: Game[];
  heroes: string[] = [];

  constructor(
    private searchService: SearchService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      const hero = +params.get('hero');
      this.searchService.searchGames(hero).subscribe(games => {
        this.games = games;
      });
    });
    this.getHeroes();
  }

  getHeroes() {
    this.searchService.getHeroes().subscribe(heroes => {
      for (let i = 0; i < heroes.length; i++) {
        this.heroes[heroes[i].id] = heroes[i].localized_name;
      }
    });
  }
}
