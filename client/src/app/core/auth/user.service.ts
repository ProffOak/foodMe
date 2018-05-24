import { Injectable } from '@angular/core';
import {ObjectService} from '../database/object.service';
import {HttpClient} from '@angular/common/http';
import {User} from './shared/user.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

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
  addUser(user: User): Observable<User> {
    return this.addObject(user);
  }

}
