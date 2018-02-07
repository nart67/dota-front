import { Component, OnInit } from '@angular/core';
import { Game } from './game';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  game: Game = {
    match_id: 1,
    radiant_win: true,
    start_time: 0,
    duration: 3000,
    avg_mmr: 5000,
    radiant_team: [1,2,3,4,5],
    dire_team: [6,7,8,9,10]
  }

  constructor() { }

  ngOnInit() {
  }

}
