import { SearchParams } from '../param';
import { SearchService } from './../search.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { Hero } from '../hero';
import { Router } from '@angular/router';
import { MatAutocompleteTrigger } from '@angular/material';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit, AfterViewInit {
  side: string;
  options: Hero[];
  heroControl: FormControl = new FormControl();
  opponentControl: FormControl = new FormControl();

  float = 'always';
  loss = false;

  sides = [
    {value: 'radiant', view: 'Radiant'},
    {value: 'dire', view: 'Dire'}
  ];

  filteredHeroes: Observable<Hero[]>;
  filteredOpponents: Observable<Hero[]>;

  @ViewChild('hero', { read: MatAutocompleteTrigger }) heroTrigger;
  @ViewChild('opponent', { read: MatAutocompleteTrigger }) opponentTrigger;

  constructor(
    private searchService: SearchService,
    private router: Router
  ) {}

  ngOnInit() {
    this.searchService.getHeroes().subscribe(heroes => {
      this.options = heroes;
      this.filteredHeroes = this.heroControl.valueChanges
      .pipe(
        startWith<string | Hero>(''),
        map(val => typeof val === 'string' ? val : val.localized_name),
        map(name => name ? this.filter(name) : this.options.slice())
      );
      this.filteredOpponents = this.opponentControl.valueChanges
      .pipe(
        startWith<string | Hero>(''),
        map(val => typeof val === 'string' ? val : val.localized_name),
        map(name => name ? this.filter(name) : this.options.slice())
      );
    });
    this.opponentControl.disable();
  }

  ngAfterViewInit() {
    // If a choice is not chosen, clear field
    this.heroTrigger.panelClosingActions
      .subscribe(e => {
        if (!(e && e.source)) {
          this.heroControl.setValue('');
          this.heroTrigger.closePanel();
          this.opponentControl.setValue('');
          this.opponentControl.disable();
        }
      });
    this.opponentTrigger.panelClosingActions
      .subscribe(e => {
        if (!(e && e.source)) {
          this.opponentControl.setValue('');
          this.opponentTrigger.closePanel();
        }
      });
  }

  filter(name: string): Hero[] {
    return this.options.filter(option =>
      option.localized_name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  displayFn(hero?: Hero): string | undefined {
    return hero ? hero.localized_name : undefined;
  }

  searchDisabled() {
    const control = this.heroControl.value;
    if (control == null || control === '') { return true; }
    return false;
  }

  search() {
    const hero = this.heroControl.value['id'];
    const params = new SearchParams;
    params.hero = hero;
    if (this.opponentControl.value) {
      params.opp = this.opponentControl.value['id'];
    }
    if (this.loss) {
      params.loss = 1;
    }
    if (this.side) {
      params.side = this.side;
    }

    this.router.navigate(['/games'], { queryParams: params });
  }

}
