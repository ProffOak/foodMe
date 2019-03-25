import { Injectable } from '@angular/core';
import {ObjectService} from '../database/object.service';
import {HttpClient} from '@angular/common/http';
import {User} from './shared/user.model';
import {Observable, pipe} from 'rxjs';
import {map} from 'rxjs/operators';
import {FirestoreService} from '../database/firestore.service';

@Injectable()
export class UserService extends ObjectService<User> {

  constructor(private http: HttpClient, private firestorService: FirestoreService<User>) {
    super(http, 'users', firestorService);
  }

  getUserByUid(uid: string): Observable<User> {
    return this.getObjectsByQuery(ref => ref.where('uid', '==', uid)).pipe(
      map(users => users[0])
    );
  }

  upsertUser(user: User): Promise<User> {
    return this.patchObject(user, user.uid);
  }

  userExists(id: string): Promise<boolean> {
    return this.objectExists(id);
  }

}
