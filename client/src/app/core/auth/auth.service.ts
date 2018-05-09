import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import { firebase } from '@firebase/app';
import {User} from './shared/user.model';
import {Observable} from 'rxjs/Observable';
import {UserService} from './user.service';
import {Roles} from './shared/roles';


@Injectable()
export class AuthService {
  get user$(): Observable<User> {
    return this._user$;
  }

  private _user$: Observable<User>;

  constructor(private afAuth: AngularFireAuth, private userService: UserService) {
    this.setUserObs();
  }

  // Update the user Observable with the user from the database
  private setUserObs() {
    this._user$ = this.afAuth.authState
      .switchMap(user => {
        if (user) {
          // console.log(user);
          return this.userService.getUserByUid(user.uid);
        } else {
          return Observable.of(null);
        }
      });
  }

  isLoggedInObs(): Observable<boolean> {
    return this.afAuth.authState.map(user => {
      return user !== null;
    });
  }

  ///// Login/Signup //////

  // Google provider
  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider): Observable<User> {
    return Observable.fromPromise(this.afAuth.auth.signInWithPopup(provider))
      .switchMap((credential) => {
        return this.updateUserData(credential.user);
      });
  }

  emailLogin(email: string, password: string): Observable<User> {
    return  Observable.fromPromise(this.afAuth.auth.signInWithEmailAndPassword(email, password))
      .switchMap(user => {
        return this.updateUserData(user);
    });
  }

  emailRegister(user: User, password: string): Observable<User> {
    return  Observable.fromPromise(this.afAuth.auth.createUserWithEmailAndPassword(user.email, password))
      .switchMap(res => {
        return this.createUser(res, <Roles>{regular: true}, user.name);
      });
  }

  signOut() {
    return this.afAuth.auth.signOut();
  }

  // TODO: Implement set User data to DB
  private updateUserData(user) {
    // Sets user data to DB on login
    const newUserData = <User>{
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      createdAt: user.metadata.creationTime,
      lastLoginAt: user.metadata.lastSignInTime,
    };
    if (user.displayName) {
      newUserData.name = user.displayName;
    }
    return this.userService.patchObject(newUserData, {uid: newUserData.uid});
  }

  private createUser(user, roles: Roles, name): Observable<User> {
    const data: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      createdAt: user.metadata.creationTime,
      lastLoginAt: user.metadata.lastSignInTime,
      roles: roles,
      name: name,
    };
    return this.userService.addUser(data);
  }

}



