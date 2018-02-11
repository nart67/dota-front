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
  games: Game[]

  constructor(
    private searchService: SearchService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      console.log(params.get('hero');
      const hero = +params.get('hero');
      this.searchService.searchGames(hero).subscribe(games => {
        this.games = games;
      });
    });
  }

}
