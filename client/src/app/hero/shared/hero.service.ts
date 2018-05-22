import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Hero} from './hero.model';
import { catchError, map, tap } from 'rxjs/operators';
import {ObjectService} from '../../core/database/object.service';
import {Injectable} from '@angular/core';

@Injectable()
export class HeroService extends ObjectService <Hero> {

  // url = '//localhost:3000/hero';

  objectName = 'hero';

  constructor(private http: HttpClient) {
    super(http, 'hero');
  }


  /** GET heroes from the server */
  getHeroes (): Observable<Hero[]> {
    return this.getObjects();
  }



}
