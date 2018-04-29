import { Injectable } from '@angular/core';
import {ObjectService} from '../database/object.service';
import {HttpClient} from '@angular/common/http';
import {User} from './shared/user.model';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators/map';

@Injectable()
export class UserService extends ObjectService<User> {

  constructor(private http: HttpClient) {
    super(http, 'users');
  }

  getUserByUid(uid: string): Observable<User> {
    return this.getObjectsByQuery({uid: uid}).pipe(
      map(users => users[0])
    );
  }
}
