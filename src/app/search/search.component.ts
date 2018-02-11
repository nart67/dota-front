import { SearchService } from './../search.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { Hero } from '../hero';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
  options: Hero[];
  heroControl: FormControl = new FormControl();
  filteredOptions: Observable<Hero[]>;

  constructor(private searchService: SearchService) {
    this.searchService.getHeroes().subscribe(heroes => {
      this.options = heroes;
      console.log(this.options);
      this.filteredOptions = this.heroControl.valueChanges
      .pipe(
        startWith<string | Hero>(''),
        map(val => typeof val === 'string' ? val : val.localized_name),
        map(name => name ? this.filter(name) : this.options.slice())
      );
    });
  }

  ngOnInit() {

  }

  filter(name: string): Hero[] {
    return this.options.filter(option =>
      option.localized_name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  displayFn(hero?: Hero): string | undefined {
    return hero ? hero.localized_name : undefined;
  }

}
