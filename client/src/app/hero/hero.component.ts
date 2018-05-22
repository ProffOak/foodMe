import { Component, OnInit } from '@angular/core';
import {HeroService} from './shared/hero.service';
import {Observable} from 'rxjs';
import {Hero} from './shared/hero.model';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {

  heroesObs: Observable<Hero[]>;

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.heroesObs = this.heroService.getHeroes();
  }

}
